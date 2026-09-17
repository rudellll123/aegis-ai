"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Nav } from "@/components/Nav";
import { SeverityBadge, severityColor } from "@/components/SeverityBadge";
import {
  searchIncidents,
  checkHealth,
  checkLocalApiStatus,
  uploadVideoForAnalysis,
  checkVideoAnalysis,
  transcribeAudio,
  searchEvidence,
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
  RefreshCw,
  Search,
  Inbox,
} from "lucide-react";

type Track = {
  track_id: number;
  label: string;
  first_seen: number;
  last_seen: number;
  max_confidence: number;
};

function SkeletonCard() {
  return (
    <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] animate-pulse">
      <div className="h-3 w-24 bg-[var(--color-border)] rounded mb-3"></div>
      <div className="h-8 w-16 bg-[var(--color-border)] rounded"></div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] animate-pulse">
      <div className="h-3 w-16 bg-[var(--color-border)] rounded"></div>
      <div className="h-3 flex-1 bg-[var(--color-border)] rounded"></div>
      <div className="h-5 w-16 bg-[var(--color-border)] rounded"></div>
    </div>
  );
}

const REFRESH_INTERVAL_MS = 45000;

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [localStatus, setLocalStatus] = useState<{ vision: string; rag: string; audio: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const [evidenceQuery, setEvidenceQuery] = useState("");
  const [evidenceResults, setEvidenceResults] = useState<any[]>([]);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoStatus, setVideoStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "failed">("idle");
  const [videoResult, setVideoResult] = useState<any>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioStatus, setAudioStatus] = useState<"idle" | "processing" | "completed" | "failed">("idle");
  const [audioResult, setAudioResult] = useState<any>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const loadData = useCallback(function (isBackground: boolean) {
    if (isBackground) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    Promise.all([searchIncidents(""), checkHealth()])
      .then(function (results) {
        setIncidents(results[0].results);
        setHealth(results[1]);
        setApiError(null);
        setLastUpdated(new Date());
      })
      .catch(function () {
        setApiError("Could not reach the deployed API (Render). Free tier sleeps when idle, try refreshing shortly.");
      })
      .finally(function () {
        setLoading(false);
        setRefreshing(false);
      });

    checkLocalApiStatus()
      .then(function (data) { setLocalStatus(data); })
      .catch(function () { setLocalStatus(null); });
  }, []);

  useEffect(function () {
    loadData(false);
    const interval = setInterval(function () {
      loadData(true);
    }, REFRESH_INTERVAL_MS);
    return function () {
      clearInterval(interval);
    };
  }, [loadData]);

  function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoStatus("idle");
      setVideoResult(null);
      setVideoError(null);
    }
  }

  function startVideoPolling(id: string) {
    pollRef.current = setInterval(function () {
      checkVideoAnalysis(id)
        .then(function (data) {
          if (data.status === "completed") {
            setVideoStatus("completed");
            setVideoResult(data.result);
            if (pollRef.current) clearInterval(pollRef.current);
          } else if (data.status === "failed") {
            setVideoStatus("failed");
            setVideoError(data.error || "Processing failed.");
            if (pollRef.current) clearInterval(pollRef.current);
          }
        })
        .catch(function () {
          setVideoStatus("failed");
          setVideoError("Lost connection to the local vision API (localhost:8002).");
          if (pollRef.current) clearInterval(pollRef.current);
        });
    }, 3000);
  }

  function handleAnalyzeVideo() {
    if (!videoFile) return;
    setVideoStatus("uploading");
    setVideoError(null);
    uploadVideoForAnalysis(videoFile)
      .then(function (data) {
        setVideoStatus("processing");
        startVideoPolling(data.job_id);
      })
      .catch(function () {
        setVideoStatus("failed");
        setVideoError("Could not reach localhost:8002. Make sure local_vision_api, the Celery worker, and Redis are all running.");
      });
  }

  function handleAudioSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
      setAudioStatus("idle");
      setAudioResult(null);
      setAudioError(null);
    }
  }

  function handleTranscribe() {
    if (!audioFile) return;
    setAudioStatus("processing");
    setAudioError(null);
    transcribeAudio(audioFile)
      .then(function (data) {
        setAudioResult(data);
        setAudioStatus("completed");
      })
      .catch(function () {
        setAudioStatus("failed");
        setAudioError("Could not reach localhost:8002. Make sure local_vision_api is running.");
      });
  }

  const severityCounts: Record<string, number> = {};
  incidents.forEach(function (inc) {
    const s = inc.severity.toLowerCase();
    severityCounts[s] = (severityCounts[s] || 0) + 1;
  });
  const severityEntries = Object.keys(severityCounts).map(function (key) {
    return { sev: key, count: severityCounts[key] };
  });

  const filteredIncidents = incidents.filter(function (inc) {
    const matchesSearch = searchQuery.trim() === "" || inc.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || inc.id.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    const matchesSeverity = severityFilter === null || inc.severity.toLowerCase() === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  function toggleSeverityFilter(sev: string) {
    setSeverityFilter(function (current) {
      return current === sev ? null : sev;
    });
  }

  function formatLastUpdated(d: Date | null) {
    if (!d) return "never";
    return d.toLocaleTimeString();
  }

  function handleEvidenceSearch() {
    if (!evidenceQuery.trim()) return;
    setEvidenceLoading(true);
    setEvidenceError(null);
    searchEvidence(evidenceQuery)
      .then(function (data) {
        setEvidenceResults(data.results);
      })
      .catch(function () {
        setEvidenceError("Could not reach localhost:8002. Make sure local_vision_api is running.");
      })
      .finally(function () {
        setEvidenceLoading(false);
      });
  }

  function incidentIdFromDocId(docId: string): string | null {
    const match = docId.match(/incident-(\d+)/i);
    return match ? "INC-" + match[1] : null;
  }

  return (
    <main className="relative min-h-screen">
      <div className="noise-overlay" />
      <Nav />

      <section className="relative z-10 px-8 py-12 max-w-5xl mx-auto">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-1">
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Last updated: {formatLastUpdated(lastUpdated)}
            </span>
            <button
              onClick={function () { loadData(true); }}
              disabled={refreshing}
              suppressHydrationWarning
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] hover:border-[var(--color-text-secondary)] disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-8 text-sm">
          Real incident data from the deployed API, plus live video and audio analysis via a local agent API.
        </p>

        <div className="flex gap-2 mb-8 flex-wrap">
          <span
            title={health && health.status === "healthy" ? "Deployed backend is responding normally." : "Backend did not respond. Render's free tier sleeps when idle and can take 20-30s to wake on the next request."}
            className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-help"
          >
            RENDER API: {health && health.status === "healthy" ? "ONLINE" : "OFFLINE"}
          </span>
          <span
            title={localStatus ? "Local vision API is reachable at localhost:8002." : "Could not reach localhost:8002. Start local_vision_api, the Celery worker, and Redis."}
            className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-help"
          >
            LOCAL VISION: {localStatus ? "ONLINE" : "OFFLINE"}
          </span>
          <span
            title={localStatus ? "Local RAG search is reachable at localhost:8002." : "Could not reach localhost:8002. Start local_vision_api to enable evidence search."}
            className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-help"
          >
            LOCAL RAG: {localStatus ? "ONLINE" : "OFFLINE"}
          </span>
          <span
            title={localStatus ? "Local audio transcription is reachable at localhost:8002." : "Could not reach localhost:8002. Start local_vision_api to enable transcription."}
            className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] cursor-help"
          >
            LOCAL AUDIO: {localStatus ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        {apiError ? (
          <div className="mb-8 p-4 rounded-lg border border-[var(--color-sev-high)] text-[var(--color-sev-high)] text-sm font-mono flex items-center justify-between gap-4 flex-wrap">
            <span>{apiError}</span>
            <button
              onClick={function () { loadData(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--color-sev-high)] text-xs font-mono hover:bg-[var(--color-sev-high)] hover:text-black transition-colors shrink-0"
            >
              <RefreshCw size={12} />
              Retry
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : null}

        {!loading && !apiError ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs font-mono mb-2">
                <AlertCircle size={14} />
                <span>TOTAL INCIDENTS</span>
              </div>
              <div className="font-display text-4xl font-bold">{incidents.length}</div>
            </div>
            <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs font-mono mb-2">
                <Activity size={14} />
                <span>API STATUS</span>
              </div>
              <div className="font-display text-2xl font-bold" style={{ color: health && health.status === "healthy" ? "var(--color-sev-low)" : "var(--color-sev-high)" }}>
                {health && health.status === "healthy" ? "Healthy" : "Unavailable"}
              </div>
            </div>
            <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs font-mono mb-2">
                <Database size={14} />
                <span>DATABASE</span>
              </div>
              <div className="font-display text-2xl font-bold" style={{ color: health && health.database === "connected" ? "var(--color-sev-low)" : "var(--color-sev-high)" }}>
                {health && health.database === "connected" ? "Connected" : "Unavailable"}
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <h2 className="font-display text-lg font-bold mb-1">Upload Video</h2>
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">YOLOv8 + ByteTrack, real detection, local API required</p>

            <input type="file" accept="video/mp4,video/avi,video/quicktime,.mp4,.avi,.mov" onChange={handleVideoSelect} className="hidden" id="dash-video-upload" />
            <label htmlFor="dash-video-upload" className="cursor-pointer flex flex-col items-center gap-2 border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 mb-4">
              <Upload size={24} color="var(--color-text-muted)" />
              <span className="text-xs text-[var(--color-text-secondary)] text-center">
                {videoFile ? videoFile.name : "Click to select a video"}
              </span>
            </label>

            <button
              onClick={handleAnalyzeVideo}
              disabled={!videoFile || videoStatus === "uploading" || videoStatus === "processing"}
              className="w-full px-4 py-2 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed mb-3"
              style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}
            >
              Analyze Video
            </button>

            {videoStatus === "uploading" || videoStatus === "processing" ? (
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <Loader2 size={14} className="animate-spin" />
                {videoStatus === "uploading" ? "Uploading..." : "Processing frames (15-30s)..."}
              </div>
            ) : null}

            {videoStatus === "failed" ? (
              <div className="flex items-start gap-2 text-xs font-mono text-[var(--color-sev-high)]">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>{videoError}</span>
              </div>
            ) : null}

            {videoStatus === "completed" && videoResult ? (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                  <CheckCircle2 size={14} color="var(--color-sev-low)" />
                  {videoResult.unique_objects} tracked object{videoResult.unique_objects === 1 ? "" : "s"} in {videoResult.frames_analyzed} frames
                </div>
                <div className="grid gap-1 max-h-48 overflow-y-auto">
                  {videoResult.tracks && videoResult.tracks.map(function (t: Track) {
                    return (
                      <div key={t.track_id} className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg)] font-mono text-xs">
                        <span className="text-[var(--color-text-muted)]">#{t.track_id}</span>
                        <span style={{ color: "var(--color-accent)" }}>{t.label}</span>
                        <span className="text-[var(--color-text-muted)] ml-auto">{t.max_confidence}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="p-5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <h2 className="font-display text-lg font-bold mb-1">Upload Audio</h2>
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">Whisper transcription, real inference, local API required</p>

            <input type="file" accept="audio/wav,audio/mpeg,.wav,.mp3" onChange={handleAudioSelect} className="hidden" id="dash-audio-upload" />
            <label htmlFor="dash-audio-upload" className="cursor-pointer flex flex-col items-center gap-2 border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 mb-4">
              <Mic size={24} color="var(--color-text-muted)" />
              <span className="text-xs text-[var(--color-text-secondary)] text-center">
                {audioFile ? audioFile.name : "Click to select an audio file (WAV/MP3)"}
              </span>
            </label>

            <button
              onClick={handleTranscribe}
              disabled={!audioFile || audioStatus === "processing"}
              className="w-full px-4 py-2 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed mb-3"
              style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}
            >
              Transcribe Audio
            </button>

            {audioStatus === "processing" ? (
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)]">
                <Loader2 size={14} className="animate-spin" /> Transcribing...
              </div>
            ) : null}

            {audioStatus === "failed" ? (
              <div className="flex items-start gap-2 text-xs font-mono text-[var(--color-sev-high)]">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>{audioError}</span>
              </div>
            ) : null}

            {audioStatus === "completed" && audioResult ? (
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                  <CheckCircle2 size={14} color="var(--color-sev-low)" />
                  Language: {audioResult.language}
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] p-3 rounded bg-[var(--color-bg)] font-mono leading-relaxed">
                  {audioResult.text}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <h2 className="font-display text-xl font-bold mb-3">Severity Breakdown</h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">Click a severity to filter incidents below</p>
        <div className="flex gap-3 mb-10 flex-wrap">
          {severityEntries.length === 0 && !loading ? (
            <span className="text-sm text-[var(--color-text-muted)]">No incidents to summarize.</span>
          ) : null}
          {severityEntries.map(function (entry) {
            const isActive = severityFilter === entry.sev;
            return (
              <button
                key={entry.sev}
                onClick={function () { toggleSeverityFilter(entry.sev); }}
                className="px-4 py-3 rounded-lg bg-[var(--color-bg-card)] border text-left transition-colors"
                style={{ borderColor: isActive ? severityColor(entry.sev) : "var(--color-border)" }}
              >
                <div className="font-mono text-xs mb-1" style={{ color: severityColor(entry.sev) }}>{entry.sev.toUpperCase()}</div>
                <div className="font-display text-2xl font-bold">{entry.count}</div>
              </button>
            );
          })}
        </div>

        <h2 className="font-display text-xl font-bold mb-3">Evidence Search</h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-4 font-mono">Semantic search across incident reports and policy documents, local RAG required</p>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={evidenceQuery}
            onChange={function (e) { setEvidenceQuery(e.target.value); }}
            onKeyDown={function (e) { if (e.key === "Enter") handleEvidenceSearch(); }}
            placeholder="e.g. forklift safety violations"
            suppressHydrationWarning
            className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-text-secondary)]"
          />
          <button
            onClick={handleEvidenceSearch}
            disabled={!evidenceQuery.trim() || evidenceLoading}
            className="px-4 py-2 rounded font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}
          >
            Search
          </button>
        </div>

        {evidenceLoading ? (
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)] mb-10">
            <Loader2 size={14} className="animate-spin" /> Searching evidence...
          </div>
        ) : null}

        {evidenceError ? (
          <div className="mb-10 p-3 rounded-lg border border-[var(--color-sev-high)] text-[var(--color-sev-high)] text-xs font-mono">
            {evidenceError}
          </div>
        ) : null}

        {!evidenceLoading && !evidenceError && evidenceResults.length > 0 ? (
          <div className="grid gap-3 mb-10">
            {evidenceResults.map(function (r: any, idx: number) {
              const linkedIncident = incidentIdFromDocId(r.doc_id);
              return (
                <div key={idx} className="p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">{r.doc_id}</span>
                    {linkedIncident ? (
                      <a href={"/incidents/" + linkedIncident} className="font-mono text-xs text-[var(--color-accent)] hover:underline">
                        View {linkedIncident}
                      </a>
                    ) : null}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{r.text}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <h2 className="font-display text-xl font-bold">Recent Incidents</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={function (e) { setSearchQuery(e.target.value); }}
              placeholder="Search by title or ID..."
              suppressHydrationWarning
              className="pl-9 pr-3 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-text-secondary)] w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-3">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : null}

        {!loading && filteredIncidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-[var(--color-text-muted)]">
            <Inbox size={28} />
            <p className="text-sm">
              {incidents.length === 0 ? "No incidents recorded yet." : "No incidents match your search or filter."}
            </p>
            {severityFilter || searchQuery ? (
              <button
                onClick={function () { setSeverityFilter(null); setSearchQuery(""); }}
                className="text-xs font-mono underline hover:text-[var(--color-text-secondary)]"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : null}

        {!loading && filteredIncidents.length > 0 ? (
          <div className="grid gap-3">
            {filteredIncidents.map(function (inc) {
              return (
                <a key={inc.id} href={"/incidents/" + inc.id} className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] transition-colors">
                  <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{inc.id}</span>
                  <span className="flex-1 text-sm">{inc.title}</span>
                  <SeverityBadge severity={inc.severity} />
                </a>
              );
            })}
          </div>
        ) : null}
      </section>
    </main>
  );
}
