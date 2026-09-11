import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "rag"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "vision"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "audio"))

from mcp.server.fastmcp import FastMCP
from retrieve import hybrid_search, rerank
from tracker import summarize_tracked_objects
from transcriber import transcribe_audio
from speaker import speak_text
from db import SessionLocal, Incident
from celery_app import celery_app
from tasks import analyze_video_task

mcp = FastMCP("AegisAI-Incidents")

@mcp.tool()
def search_incidents(query: str) -> str:
    """Search for historical incident summaries matching a keyword query."""
    query_lower = query.lower()
    session = SessionLocal()
    try:
        all_incidents = session.query(Incident).all()
        matches = [
            f"[{inc.id}] {inc.title} (Severity: {inc.severity})"
            for inc in all_incidents
            if query_lower in inc.title.lower() or query_lower in inc.description.lower()
        ]
    finally:
        session.close()
    if not matches:
        return f"No incidents found matching query: '{query}'"
    return "\n".join(matches)

@mcp.tool()
def get_incident_details(incident_id: str) -> str:
    """Retrieve full diagnostic logs and metadata details for a specific incident ID."""
    session = SessionLocal()
    try:
        inc = session.get(Incident, incident_id.upper())
        if inc is None:
            return f"Incident ID '{incident_id}' not found in database records."
        return (
            f"ID: {inc.id}\nTitle: {inc.title}\nSeverity: {inc.severity}\n"
            f"Date: {inc.date}\nFull Description: {inc.description}"
        )
    finally:
        session.close()

@mcp.tool()
def search_evidence(query: str) -> str:
    """Search safety policies and incident reports using hybrid retrieval (dense + BM25 + reranking) to find the most relevant supporting evidence."""
    candidates = hybrid_search(query, top_k=10)
    top = rerank(query, candidates, top_k=3)
    return "\n\n".join(f"[{c['doc_id']}] {c['text']}" for c in top)

@mcp.tool()
def analyze_incident_video(video_path: str) -> str:
    """Analyze a short video for incident evidence using computer vision (blocking/synchronous) - detects and tracks people, vehicles, and equipment across frames, returning what was seen and when. For long or heavy videos, use start_video_analysis instead so the agent doesn't block."""
    result = summarize_tracked_objects(video_path)
    if result["unique_objects"] == 0:
        return f"No relevant objects detected in {video_path}."

    lines = [f"Analyzed {result['frames_analyzed']} frames, found {result['unique_objects']} tracked object(s):"]
    for t in result["tracks"]:
        duration = round(t["last_seen"] - t["first_seen"], 2)
        lines.append(
            f"- {t['label']} (track #{t['track_id']}): present {t['first_seen']}s-{t['last_seen']}s "
            f"(duration {duration}s, confidence {t['max_confidence']})"
        )
    return "\n".join(lines)

@mcp.tool()
def start_video_analysis(video_path: str) -> str:
    """Start analyzing a video for incident evidence in the background (asynchronous) - use this for long or heavy videos instead of analyze_incident_video, since it returns immediately with a job ID instead of blocking. Check progress and get the result with check_video_analysis."""
    task = analyze_video_task.delay(video_path)
    return f"Video analysis started in the background. Job ID: {task.id}. Use check_video_analysis to get the result once ready."

@mcp.tool()
def check_video_analysis(task_id: str) -> str:
    """Check the status of a background video analysis job started by start_video_analysis, and return the result if it's ready."""
    result = celery_app.AsyncResult(task_id)
    if result.status == "PENDING":
        return f"Job {task_id} is still queued or running. Try again shortly."
    if result.status == "FAILURE":
        return f"Job {task_id} failed: {result.result}"
    if result.status != "SUCCESS":
        return f"Job {task_id} status: {result.status}. Not ready yet."

    data = result.result
    if data["unique_objects"] == 0:
        return f"No relevant objects detected in {data['video_path']}."
    lines = [f"Analyzed {data['frames_analyzed']} frames, found {data['unique_objects']} tracked object(s):"]
    for t in data["tracks"]:
        duration = round(t["last_seen"] - t["first_seen"], 2)
        lines.append(
            f"- {t['label']} (track #{t['track_id']}): present {t['first_seen']}s-{t['last_seen']}s "
            f"(duration {duration}s, confidence {t['max_confidence']})"
        )
    return "\n".join(lines)

@mcp.tool()
def transcribe_incident_report(audio_path: str) -> str:
    """Transcribe a spoken incident report or voice note into text, so it can be searched and reasoned over alongside other evidence."""
    result = transcribe_audio(audio_path)
    return f"Transcript (language: {result['language']}): {result['text']}"

@mcp.tool()
def speak_response(text: str) -> str:
    """Convert a text response into spoken audio, saved as a file."""
    output_path = os.path.join(os.path.dirname(__file__), "..", "audio", "output_speech.wav")
    speak_text(text, output_path)
    return f"Speech audio saved to {output_path}"

if __name__ == "__main__":
    mcp.run()
