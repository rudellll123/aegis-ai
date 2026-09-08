from langchain_core.tools import tool
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "rag"))
sys.path.append(os.path.join(os.path.dirname(__file__), "vision"))
sys.path.append(os.path.join(os.path.dirname(__file__), "audio"))

from retrieve import hybrid_search, rerank
from tracker import summarize_tracked_objects
from transcriber import transcribe_audio
from speaker import speak_text

INCIDENT_DATABASE = [
    {
        "id": "INC-1001",
        "title": "Forklift near-miss in Loading Dock B",
        "severity": "Low",
        "description": "A forklift reversed unexpectedly without its backup alarm sounding. Nearby pedestrian stepped back safely.",
        "date": "2026-08-30"
    },
    {
        "id": "INC-1002",
        "title": "Minor chemical spill in Mixing Lab",
        "severity": "Medium",
        "description": "Approximately 500ml of cleaning solvent leaked from an unsecured container. Cleaned using standard spill kit.",
        "date": "2026-08-31"
    }
]

@tool
def search_incidents(query: str) -> str:
    """Search for historical incident summaries matching a keyword query."""
    query_lower = query.lower()
    matches = [
        f"[{inc['id']}] {inc['title']} (Severity: {inc['severity']})"
        for inc in INCIDENT_DATABASE
        if query_lower in inc["title"].lower() or query_lower in inc["description"].lower()
    ]
    if not matches:
        return f"No incidents found matching query: '{query}'"
    return "\n".join(matches)

@tool
def get_incident_details(incident_id: str) -> str:
    """Retrieve full diagnostic logs and metadata details for a specific incident ID."""
    for inc in INCIDENT_DATABASE:
        if inc["id"].upper() == incident_id.upper():
            return (
                f"ID: {inc['id']}\nTitle: {inc['title']}\nSeverity: {inc['severity']}\n"
                f"Date: {inc['date']}\nFull Description: {inc['description']}"
            )
    return f"Incident ID '{incident_id}' not found in database records."

@tool
def search_evidence(query: str) -> str:
    """Search safety policies and incident reports using hybrid retrieval (dense + BM25 + reranking) to find the most relevant supporting evidence."""
    candidates = hybrid_search(query, top_k=10)
    top = rerank(query, candidates, top_k=3)
    return "\n\n".join(f"[{c['doc_id']}] {c['text']}" for c in top)

@tool
def analyze_incident_video(video_path: str) -> str:
    """Analyze a video for incident evidence using computer vision - detects and tracks people, vehicles, and equipment across frames, returning what was seen and when."""
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

@tool
def transcribe_incident_report(audio_path: str) -> str:
    """Transcribe a spoken incident report or voice note into text, so it can be searched and reasoned over alongside other evidence."""
    result = transcribe_audio(audio_path)
    return f"Transcript (language: {result['language']}): {result['text']}"

@tool
def speak_response(text: str) -> str:
    """Convert a text response into spoken audio, saved as a file - use when the user asks for an audible/voice response instead of text."""
    output_path = "audio/output_speech.wav"
    speak_text(text, output_path)
    return f"Speech audio saved to {output_path}"

ALL_TOOLS = [search_incidents, get_incident_details, search_evidence, analyze_incident_video, transcribe_incident_report, speak_response]
