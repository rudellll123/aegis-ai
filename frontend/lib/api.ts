import { Incident, IncidentDetail, HealthStatus } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://aegis-ai-b3k8.onrender.com";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(API_BASE + path);
  if (!res.ok) {
    throw new Error("API request failed with status " + res.status);
  }
  return res.json();
}

export async function searchIncidents(query: string): Promise<{ query: string; count: number; results: Incident[] }> {
  return request("/incidents?query=" + encodeURIComponent(query));
}

export async function getIncident(id: string): Promise<IncidentDetail> {
  return request("/incidents/" + encodeURIComponent(id));
}

export async function checkHealth(): Promise<HealthStatus> {
  return request("/health");
}

const VISION_API_BASE = process.env.NEXT_PUBLIC_VISION_API_URL || "http://localhost:8002";

export async function uploadVideoForAnalysis(file: File): Promise<{ job_id: string; status: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(VISION_API_BASE + "/vision/analyze", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Video upload failed with status " + res.status);
  }
  return res.json();
}

export async function checkVideoAnalysis(jobId: string): Promise<any> {
  const res = await fetch(VISION_API_BASE + "/vision/analyze/" + jobId);
  if (!res.ok) {
    throw new Error("Job status check failed with status " + res.status);
  }
  return res.json();
}

export async function searchEvidence(query: string): Promise<{ query: string; results: any[] }> {
  const res = await fetch(VISION_API_BASE + "/rag/search?query=" + encodeURIComponent(query));
  if (!res.ok) {
    throw new Error("RAG search failed with status " + res.status);
  }
  return res.json();
}

export async function transcribeAudio(file: File): Promise<{ text: string; language: string; segments: any[] }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(VISION_API_BASE + "/audio/transcribe", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Transcription failed with status " + res.status);
  }
  return res.json();
}

export async function checkLocalApiStatus(): Promise<{ vision: string; rag: string; audio: string }> {
  const res = await fetch(VISION_API_BASE + "/status");
  if (!res.ok) {
    throw new Error("Local API status check failed");
  }
  return res.json();
}
