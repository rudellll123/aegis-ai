
"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { SeverityBadge, severityColor } from "@/components/SeverityBadge";
import {
  searchIncidents,
  checkHealth,
  checkLocalApiStatus,
  uploadVideoForAnalysis,
  checkVideoAnalysis,
  transcribeAudio,
} from "@/lib/api";
import { Incident, HealthStatus } from "@/lib/types";
import {
  Activity,
  Database,
  AlertCircle,
  Upload,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Video,
  BrainCircuit,
  ShieldCheck,
  Server,
  FileSearch,
  ChevronRight,
  RefreshCw,
  Cpu,
  Radio,
  Sparkles,
} from "lucide-react";

type Track = {
  track_id: number;
  label: string;
  first_seen: number;
  last_seen: number;
  max_confidence: number;
};

type ServiceStatus = {
  vision: string;
  rag: string;
  audio: string;
};

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [localStatus, setLocalStatus] = useState<ServiceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoStatus, setVideoStatus] = useState<
    "idle" | "uploading" | "processing" | "completed" | "failed"
  >("idle");
  const [videoResult, setVideoResult] = useState<any>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioStatus, setAudioStatus] = useState<
    "idle" | "processing" | "completed" | "failed"
  >("idle");
  const [audioResult, setAudioResult] = useState<any>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  async function loadDashboard(showRefresh = false) {
    if (showRefresh) {
      setRefreshing(true);
    }

    try {
      setApiError(null);

      const results = await Promise.all([
        searchIncidents(""),
        checkHealth(),
      ]);

      setIncidents(results[0].results);
      setHealth(results[1]);
      setLoading(false);
    } catch {
      setApiError(
        "Could not reach the deployed API. Render may be waking from sleep. Try refreshing shortly."
      );
      setLoading(false);
    }

    try {
      const data = await checkLocalApiStatus();
      setLocalStatus(data);
    } catch {
      setLocalStatus(null);
    }

    setRefreshing(false);
  }

  useEffect(() => {
    loadDashboard();

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, []);

  function handleVideoSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setVideoFile(file);
      setVideoStatus("idle");
      setVideoResult(null);
      setVideoError(null);
    }
  }

  function startVideoPolling(id: string) {
    if (pollRef.current) {
      clearInterval(pollRef.current);
    }

    pollRef.current = setInterval(() => {
      checkVideoAnalysis(id)
        .then((data) => {
          if (data.status === "completed") {
            setVideoStatus("completed");
            setVideoResult(data.result);

            if (pollRef.current) {
              clearInterval(pollRef.current);
            }
          } else if (data.status === "failed") {
            setVideoStatus("failed");
            setVideoError(data.error || "Video processing failed.");

            if (pollRef.current) {
              clearInterval(pollRef.current);
            }
          }
        })
        .catch(() => {
          setVideoStatus("failed");
          setVideoError(
            "Lost connection to the local vision API (localhost:8002)."
          );

          if (pollRef.current) {
            clearInterval(pollRef.current);
          }
        });
    }, 3000);
  }

  function handleAnalyzeVideo() {
    if (!videoFile) {
      return;
    }

    setVideoStatus("uploading");
    setVideoError(null);
    setVideoResult(null);

    uploadVideoForAnalysis(videoFile)
      .then((data) => {
        setVideoStatus("processing");
        startVideoPolling(data.job_id);
      })
      .catch(() => {
        setVideoStatus("failed");

        setVideoError(
          "Could not reach localhost:8002. Make sure the local vision API, Celery worker, and Redis are running."
        );
      });
  }

  function handleAudioSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setAudioFile(file);
      setAudioStatus("idle");
      setAudioResult(null);
      setAudioError(null);
    }
  }

  function handleTranscribe() {
    if (!audioFile) {
      return;
    }

    setAudioStatus("processing");
    setAudioError(null);
    setAudioResult(null);

    transcribeAudio(audioFile)
      .then((data) => {
        setAudioResult(data);
        setAudioStatus("completed");
      })
      .catch(() => {
        setAudioStatus("failed");

        setAudioError(
          "Could not reach localhost:8002. Make sure the local vision/audio API is running."
        );
      });
  }

  const severityCounts: Record<string, number> = {};

  incidents.forEach((inc) => {
    const severity = inc.severity.toLowerCase();

    severityCounts[severity] =
      (severityCounts[severity] || 0) + 1;
  });

  const severityEntries = Object.keys(severityCounts)
    .map((key) => ({
      sev: key,
      count: severityCounts[key],
    }))
    .sort((a, b) => b.count - a.count);

  const criticalCount = severityCounts["critical"] || 0;
  const highCount = severityCounts["high"] || 0;
  const mediumCount = severityCounts["medium"] || 0;
  const lowCount = severityCounts["low"] || 0;

  const healthy =
    health && health.status === "healthy";

  return (
    <main className="relative min-h-screen bg-[var(--color-bg)]">
      <div className="noise-overlay" />

      <Nav />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), #6366f1)",
                }}
              >
                <BrainCircuit size={17} color="#ffffff" />
              </span>

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                AI INCIDENT INTELLIGENCE
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Command Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              Monitor incidents, analyze multimodal evidence, and inspect
              AI-assisted investigation results from one unified workspace.
            </p>
          </div>

          <button
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
            className="flex w-fit items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-xs font-semibold transition-all hover:border-[var(--color-text-secondary)] disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* SYSTEM STATUS */}

        <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 shadow-lg">
          <div className="mb-3 flex items-center gap-2">
            <Radio size={14} />

            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              System Status
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatusItem
              label="Render API"
              online={!!healthy}
              icon={<Server size={15} />}
            />

            <StatusItem
              label="Vision Engine"
              online={!!localStatus}
              icon={<Video size={15} />}
            />

            <StatusItem
              label="RAG Engine"
              online={!!localStatus}
              icon={<FileSearch size={15} />}
            />

            <StatusItem
              label="Audio Engine"
              online={!!localStatus}
              icon={<Mic size={15} />}
            />
          </div>
        </div>

        {/* ERROR */}

        {apiError ? (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div>
              <p className="text-sm font-semibold text-red-400">
                API Connection Issue
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                {apiError}
              </p>
            </div>
          </div>
        ) : null}

        {/* KPI CARDS */}

        {!loading ? (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="Total Incidents"
              value={incidents.length}
              description="Recorded investigations"
              icon={<AlertCircle size={19} />}
              accent="var(--color-accent)"
            />

            <KpiCard
              label="Critical / High"
              value={criticalCount + highCount}
              description="Requires attention"
              icon={<ShieldCheck size={19} />}
              accent="#ef4444"
            />

            <KpiCard
              label="Evidence Sources"
              value="4"
              description="RAG • Vision • Audio • Data"
              icon={<Database size={19} />}
              accent="#8b5cf6"
            />

            <KpiCard
              label="System Health"
              value={healthy ? "98%" : "—"}
              description={
                healthy
                  ? "Core API operational"
                  : "API unavailable"
              }
              icon={<Activity size={19} />}
              accent="#22c55e"
            />
          </div>
        ) : (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]"
              />
            ))}
          </div>
        )}

        {/* AI PIPELINE */}

        <div className="mb-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={17}
                  className="text-[var(--color-accent)]"
                />

                <h2 className="font-display text-lg font-bold">
                  Multimodal Analysis Pipeline
                </h2>
              </div>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Evidence flows through specialized AI services before
                producing investigation-ready results.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
              HUMAN-IN-THE-LOOP
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <PipelineNode
              number="01"
              title="Retrieve"
              subtitle="RAG / Qdrant"
              icon={<FileSearch size={18} />}
            />

            <PipelineNode
              number="02"
              title="See"
              subtitle="YOLO / ByteTrack"
              icon={<Video size={18} />}
            />

            <PipelineNode
              number="03"
              title="Listen"
              subtitle="Whisper"
              icon={<Mic size={18} />}
            />

            <PipelineNode
              number="04"
              title="Investigate"
              subtitle="AI Reasoning"
              icon={<BrainCircuit size={18} />}
            />
          </div>
        </div>

        {/* UPLOAD SECTION */}

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* VIDEO */}

          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="border-b border-[var(--color-border)] p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Video size={20} />
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold">
                      Video Intelligence
                    </h2>

                    <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      YOLOv8 + ByteTrack
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-blue-500/10 px-2 py-1 font-mono text-[9px] text-blue-400">
                  COMPUTER VISION
                </span>
              </div>
            </div>

            <div className="p-5">
              <input
                type="file"
                accept="video/mp4,video/avi,video/quicktime,.mp4,.avi,.mov"
                onChange={handleVideoSelect}
                className="hidden"
                id="dash-video-upload"
              />

              <label
                htmlFor="dash-video-upload"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-border)] px-5 py-9 transition-all hover:border-blue-400/50 hover:bg-blue-500/5"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 transition-transform group-hover:scale-110">
                  <Upload size={20} className="text-blue-400" />
                </div>

                <span className="text-sm font-semibold">
                  {videoFile
                    ? videoFile.name
                    : "Upload incident footage"}
                </span>

                <span className="mt-1 text-xs text-[var(--color-text-muted)]">
                  MP4, AVI or MOV
                </span>
              </label>

              <button
                onClick={handleAnalyzeVideo}
                disabled={
                  !videoFile ||
                  videoStatus === "uploading" ||
                  videoStatus === "processing"
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#0a0a0c",
                }}
              >
                {videoStatus === "uploading" ||
                videoStatus === "processing" ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    {videoStatus === "uploading"
                      ? "Uploading..."
                      : "Analyzing Frames..."}
                  </>
                ) : (
                  <>
                    <Cpu size={16} />
                    Analyze Video
                  </>
                )}
              </button>

              {videoStatus === "failed" ? (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex gap-2 text-xs text-red-400">
                    <AlertTriangle
                      size={15}
                      className="shrink-0"
                    />

                    <span>{videoError}</span>
                  </div>
                </div>
              ) : null}

              {videoStatus === "completed" &&
              videoResult ? (
                <div className="mt-5 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle2
                      size={17}
                      className="text-green-400"
                    />

                    <span className="text-sm font-semibold text-green-400">
                      Analysis Complete
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <ResultMetric
                      label="Objects"
                      value={
                        videoResult.unique_objects ?? 0
                      }
                    />

                    <ResultMetric
                      label="Frames"
                      value={
                        videoResult.frames_analyzed ?? 0
                      }
                    />
                  </div>

                  {videoResult.tracks &&
                  videoResult.tracks.length > 0 ? (
                    <div>
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                        Tracked Objects
                      </p>

                      <div className="max-h-40 space-y-1.5 overflow-y-auto">
                        {videoResult.tracks.map(
                          (track: Track) => (
                            <div
                              key={track.track_id}
                              className="flex items-center gap-3 rounded-lg bg-[var(--color-bg)] px-3 py-2.5"
                            >
                              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                                #{track.track_id}
                              </span>

                              <span className="text-xs font-semibold text-blue-400">
                                {track.label}
                              </span>

                              <span className="ml-auto font-mono text-[10px] text-[var(--color-text-muted)]">
                                {track.max_confidence}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {/* AUDIO */}

          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="border-b border-[var(--color-border)] p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <Mic size={20} />
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold">
                      Audio Intelligence
                    </h2>

                    <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      OpenAI Whisper
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-purple-500/10 px-2 py-1 font-mono text-[9px] text-purple-400">
                  SPEECH AI
                </span>
              </div>
            </div>

            <div className="p-5">
              <input
                type="file"
                accept="audio/wav,audio/mpeg,.wav,.mp3"
                onChange={handleAudioSelect}
                className="hidden"
                id="dash-audio-upload"
              />

              <label
                htmlFor="dash-audio-upload"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-border)] px-5 py-9 transition-all hover:border-purple-400/50 hover:bg-purple-500/5"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 transition-transform group-hover:scale-110">
                  <Mic size={20} className="text-purple-400" />
                </div>

                <span className="text-sm font-semibold">
                  {audioFile
                    ? audioFile.name
                    : "Upload incident audio"}
                </span>

                <span className="mt-1 text-xs text-[var(--color-text-muted)]">
                  WAV or MP3
                </span>
              </label>

              <button
                onClick={handleTranscribe}
                disabled={
                  !audioFile ||
                  audioStatus === "processing"
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#0a0a0c",
                }}
              >
                {audioStatus === "processing" ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Transcribing...
                  </>
                ) : (
                  <>
                    <Mic size={16} />
                    Transcribe Audio
                  </>
                )}
              </button>

              {audioStatus === "failed" ? (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex gap-2 text-xs text-red-400">
                    <AlertTriangle
                      size={15}
                      className="shrink-0"
                    />

                    <span>{audioError}</span>
                  </div>
                </div>
              ) : null}

              {audioStatus === "completed" &&
              audioResult ? (
                <div className="mt-5 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2
                      size={17}
                      className="text-green-400"
                    />

                    <span className="text-sm font-semibold">
                      Transcription Complete
                    </span>

                    <span className="ml-auto rounded-full bg-purple-500/10 px-2 py-1 font-mono text-[9px] uppercase text-purple-400">
                      {audioResult.language || "Detected"}
                    </span>
                  </div>

                  <div className="rounded-lg bg-[var(--color-bg)] p-4">
                    <p className="font-mono text-xs leading-6 text-[var(--color-text-secondary)]">
                      {audioResult.text}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* SEVERITY */}

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 lg:col-span-2">
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold">
                Severity Distribution
              </h2>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Current incident classification across the system.
              </p>
            </div>

            {incidents.length === 0 ? (
              <div className="flex min-h-32 items-center justify-center text-sm text-[var(--color-text-muted)]">
                No incident data available.
              </div>
            ) : (
              <div className="space-y-5">
                <SeverityBar
                  label="Critical"
                  count={criticalCount}
                  total={incidents.length}
                  color={severityColor("critical")}
                />

                <SeverityBar
                  label="High"
                  count={highCount}
                  total={incidents.length}
                  color={severityColor("high")}
                />

                <SeverityBar
                  label="Medium"
                  count={mediumCount}
                  total={incidents.length}
                  color={severityColor("medium")}
                />

                <SeverityBar
                  label="Low"
                  count={lowCount}
                  total={incidents.length}
                  color={severityColor("low")}
                />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
            <h2 className="font-display text-xl font-bold">
              Classification
            </h2>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Incident breakdown.
            </p>

            <div className="mt-5 space-y-2">
              {severityEntries.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)]">
                  No classifications available.
                </p>
              ) : (
                severityEntries.map((entry) => (
                  <div
                    key={entry.sev}
                    className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            severityColor(entry.sev),
                        }}
                      />

                      <span className="font-mono text-[10px] font-bold uppercase">
                        {entry.sev}
                      </span>
                    </div>

                    <span className="font-display text-lg font-bold">
                      {entry.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RECENT INCIDENTS */}

        <div className="mb-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />

                <h2 className="font-display text-xl font-bold">
                  Recent Incidents
                </h2>
              </div>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Latest investigations stored in PostgreSQL.
              </p>
            </div>

            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
              {incidents.length} RECORDS
            </span>
          </div>

          {incidents.length === 0 ? (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
              <Database
                size={28}
                className="mx-auto mb-3 text-[var(--color-text-muted)]"
              />

              <p className="text-sm font-semibold">
                No incidents found
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Incident records will appear here when available.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
              <div className="hidden grid-cols-[80px_1fr_120px_40px] gap-4 border-b border-[var(--color-border)] px-5 py-3 font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] sm:grid">
                <span>ID</span>
                <span>Incident</span>
                <span>Severity</span>
                <span />
              </div>

              <div>
                {incidents.map((inc) => (
                  <a
                    key={inc.id}
                    href={"/incidents/" + inc.id}
                    className="group grid grid-cols-[55px_1fr_30px] items-center gap-3 border-b border-[var(--color-border)] px-4 py-4 transition-all last:border-b-0 hover:bg-white/[0.025] sm:grid-cols-[80px_1fr_120px_40px] sm:gap-4 sm:px-5"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      #{inc.id}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {inc.title}
                      </p>

                      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
                        AI investigation
                      </p>
                    </div>

                    <div className="hidden sm:block">
                      <SeverityBadge severity={inc.severity} />
                    </div>

                    <ChevronRight
                      size={16}
                      className="ml-auto text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-text-secondary)]"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
              <ShieldCheck
                size={18}
                className="text-green-400"
              />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold">
                AI-assisted investigation system
              </p>

              <p className="mt-0.5 text-[10px] leading-5 text-[var(--color-text-muted)]">
                AegisAI provides evidence-based analysis for human review.
                Automated results should be validated before operational decisions.
              </p>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-wider text-green-400">
              HUMAN REVIEW ENABLED
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* STATUS ITEM */

function StatusItem({
  label,
  online,
  icon,
}: {
  label: string;
  online: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">
      <div
        className="flex h-7 w-7 items-center justify-center rounded-md"
        style={{
          backgroundColor: online
            ? "rgba(34,197,94,0.10)"
            : "rgba(239,68,68,0.10)",
        }}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold">
          {label}
        </p>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: online
                ? "#22c55e"
                : "#ef4444",
            }}
          />

          <span
            className="font-mono text-[8px] uppercase"
            style={{
              color: online ? "#22c55e" : "#ef4444",
            }}
          >
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* KPI CARD */

function KpiCard({
  label,
  value,
  description,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-text-secondary)]">
      <div
        className="absolute right-0 top-0 h-20 w-20 rounded-full opacity-10 blur-2xl"
        style={{
          backgroundColor: accent,
        }}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
          </span>

          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
            }}
          >
            {icon}
          </div>
        </div>

        <div className="font-display text-3xl font-bold tracking-tight">
          {value}
        </div>

        <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* PIPELINE NODE */

function PipelineNode({
  number,
  title,
  subtitle,
  icon,
}: {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition-all hover:border-[var(--color-accent)]/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[9px] text-[var(--color-text-muted)]">
          {number}
        </span>

        <span className="text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]">
          {icon}
        </span>
      </div>

      <p className="text-sm font-bold">
        {title}
      </p>

      <p className="mt-1 font-mono text-[9px] text-[var(--color-text-muted)]">
        {subtitle}
      </p>
    </div>
  );
}

/* RESULT METRIC */

function ResultMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-[var(--color-bg)] p-3">
      <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </p>

      <p className="mt-1 font-display text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

/* SEVERITY BAR */

function SeverityBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage =
    total > 0
      ? Math.round((count / total) * 100)
      : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: color,
            }}
          />

          <span className="text-xs font-semibold">
            {label}
          </span>
        </div>

        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
          {count} · {percentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-bg)]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

