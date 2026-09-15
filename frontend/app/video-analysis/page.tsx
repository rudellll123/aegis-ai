"use client";

import { useState, useRef } from "react";
import { Nav } from "@/components/Nav";
import { uploadVideoForAnalysis, checkVideoAnalysis } from "@/lib/api";
import { Upload, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

type Track = {
  track_id: number;
  label: string;
  first_seen: number;
  last_seen: number;
  max_confidence: number;
};

export default function VideoAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "failed">("idle");
  const [jobId, setJobId] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setResult(null);
      setErrorMsg(null);
    }
  }

  function startPolling(id: string) {
    pollRef.current = setInterval(function () {
      checkVideoAnalysis(id)
        .then(function (data) {
          if (data.status === "completed") {
            setStatus("completed");
            setResult(data.result);
            if (pollRef.current) clearInterval(pollRef.current);
          } else if (data.status === "failed") {
            setStatus("failed");
            setErrorMsg(data.error || "Processing failed.");
            if (pollRef.current) clearInterval(pollRef.current);
          }
        })
        .catch(function () {
          setStatus("failed");
          setErrorMsg("Lost connection to the local vision API. Is it still running on port 8002?");
          if (pollRef.current) clearInterval(pollRef.current);
        });
    }, 3000);
  }

  function handleAnalyze() {
    if (!file) return;
    setStatus("uploading");
    setErrorMsg(null);
    uploadVideoForAnalysis(file)
      .then(function (data) {
        setJobId(data.job_id);
        setStatus("processing");
        startPolling(data.job_id);
      })
      .catch(function () {
        setStatus("failed");
        setErrorMsg("Could not reach the local vision API at localhost:8002. Make sure uvicorn local_vision_api:app --port 8002 and the Celery worker are both running.");
      });
  }

  return (
    <main className="relative min-h-screen">
      <div className="noise-overlay" />
      <Nav />

      <section className="relative z-10 px-8 py-12 max-w-5xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-1">Video Analysis</h1>
        <p className="text-[var(--color-text-secondary)] mb-2 text-sm max-w-2xl">
          Real YOLOv8 + ByteTrack detection and tracking, from Phase 4/7 of the project.
          This calls a local-only API, not the deployed Render service.
        </p>
        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-8">
          Requires: uvicorn local_vision_api:app --port 8002, a Celery worker, and Redis, all running on this machine.
        </p>

        <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-10 text-center mb-6">
          <input
            type="file"
            accept="video/mp4,video/avi,video/quicktime,.mp4,.avi,.mov"
            onChange={handleFileSelect}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer inline-flex flex-col items-center gap-3">
            <Upload size={32} color="var(--color-text-muted)" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {file ? file.name : "Click to select a video (MP4, AVI, MOV)"}
            </span>
          </label>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || status === "uploading" || status === "processing"}
          className="px-5 py-3 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-[1.02] mb-10"
          style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}
        >
          Analyze Video
        </button>

        {status === "uploading" ? (
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)] mb-6">
            <Loader2 size={16} className="animate-spin" /> Uploading video...
          </div>
        ) : null}

        {status === "processing" ? (
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)] mb-6">
            <Loader2 size={16} className="animate-spin" /> Processing (job {jobId})... YOLOv8 + ByteTrack running frame by frame, this can take 15-30 seconds.
          </div>
        ) : null}

        {status === "failed" ? (
          <div className="flex items-start gap-2 p-4 rounded-lg border border-[var(--color-sev-high)] text-[var(--color-sev-high)] text-sm font-mono mb-6">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        ) : null}

        {status === "completed" && result ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={18} color="var(--color-sev-low)" />
              <h2 className="font-display text-xl font-bold">
                Analysis Complete: {result.unique_objects} tracked object{result.unique_objects === 1 ? "" : "s"} across {result.frames_analyzed} frames
              </h2>
            </div>
            <div className="grid gap-2">
              {result.tracks && result.tracks.map(function (t: Track) {
                return (
                  <div key={t.track_id} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] font-mono text-xs">
                    <span className="text-[var(--color-text-muted)]">#{t.track_id}</span>
                    <span className="font-medium" style={{ color: "var(--color-accent)" }}>{t.label}</span>
                    <span className="text-[var(--color-text-secondary)]">{t.first_seen}s &rarr; {t.last_seen}s</span>
                    <span className="text-[var(--color-text-muted)] ml-auto">confidence {t.max_confidence}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
