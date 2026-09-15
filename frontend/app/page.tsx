"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowUpRight, Code2, Search, CheckCircle2 } from "lucide-react";

type Incident = {
  id: string;
  title: string;
  severity: string;
};

type Phase = {
  num: number;
  title: string;
  description: string;
  tags: string[];
};

const API_BASE = "https://aegis-ai-b3k8.onrender.com";

const PHASES: Phase[] = [
  { num: 1, title: "Agentic Foundation", description: "A hand-built LangGraph agent loop with tool calling, running 100% locally via Ollama, no API key required.", tags: ["LangGraph", "LangChain", "Ollama"] },
  { num: 2, title: "Advanced RAG", description: "Hybrid dense + BM25 retrieval with cross-encoder reranking, achieving 100% precision@3 on a real evaluation set.", tags: ["Qdrant", "BM25", "Cross-Encoder"] },
  { num: 3, title: "Knowledge Graph", description: "Neo4j-backed entity relationships, deliberately restricted to safe parameterized queries instead of free-form Cypher generation.", tags: ["Neo4j", "Cypher"] },
  { num: 4, title: "Computer Vision", description: "YOLOv8 detection, ByteTrack multi-object tracking, and VLM scene reasoning, with a real documented hallucination finding.", tags: ["YOLOv8", "ByteTrack", "VLM"] },
  { num: 5, title: "Voice / Audio", description: "Whisper speech-to-text and offline text-to-speech, verified against a known smoke-test transcript.", tags: ["Whisper", "pyttsx3"] },
  { num: 6, title: "MCP + Tool Ecosystem", description: "All tools exposed behind a standard MCP server; the agent rewired as an async MCP client instead of direct imports.", tags: ["MCP", "FastMCP"] },
  { num: 7, title: "Production Backend", description: "PostgreSQL replacing the in-memory incident store, Celery + Redis for background video-analysis jobs.", tags: ["PostgreSQL", "Redis", "Celery"] },
  { num: 8, title: "Evaluation", description: "A real eval suite measuring tool-selection accuracy, vision detection accuracy, and per-tool latency.", tags: ["Pytest", "Custom Evals"] },
  { num: 9, title: "Observability", description: "Prometheus metrics, a live Grafana dashboard, and OpenTelemetry tracing across the agent and tool layers.", tags: ["Prometheus", "Grafana", "OpenTelemetry"] },
  { num: 10, title: "AWS + CI/CD", description: "This page. A deployed FastAPI service on Render, GitHub Actions CI, and a full AWS production architecture design.", tags: ["Render", "GitHub Actions", "Docker"] },
];

function severityColor(severity: string) {
  const s = severity.toLowerCase();
  if (s === "high") return "var(--color-sev-high)";
  if (s === "medium") return "var(--color-sev-medium)";
  return "var(--color-sev-low)";
}

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<"checking" | "live" | "waking">("checking");

  function loadIncidents(q: string) {
    setLoading(true);
    setApiStatus("waking");
    fetch(API_BASE + "/incidents?query=" + encodeURIComponent(q))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setIncidents(data.results || []);
        setApiStatus("live");
        setLoading(false);
      })
      .catch(function () {
        setApiStatus("waking");
        setLoading(false);
      });
  }

  useEffect(function () {
    loadIncidents("");
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="noise-overlay" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} color="var(--color-accent)" strokeWidth={2.5} />
          <span className="font-display text-lg font-bold tracking-tight">AEGIS<span style={{ color: "var(--color-accent)" }}>AI</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
          <a href="#incidents" className="hover:text-[var(--color-text-primary)] transition-colors">Live Data</a>
          <a href="#architecture" className="hover:text-[var(--color-text-primary)] transition-colors">Architecture</a>
          <a href="https://github.com/rudellll123/aegis-ai" target="_blank" rel="noopener" className="hover:text-[var(--color-text-primary)] transition-colors">
            <Code2 size={18} />
          </a>
        </div>
      </nav>

      <section className="relative z-10 px-8 pt-24 pb-20 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)]">
            10 / 13 PHASES SHIPPED
          </span>
          <span className={"font-mono text-xs px-2 py-1 rounded border flex items-center gap-1.5 " + (apiStatus === "live" ? "border-[var(--color-sev-low)] text-[var(--color-sev-low)]" : "border-[var(--color-border)] text-[var(--color-text-muted)]")}>
            <span className={"w-1.5 h-1.5 rounded-full " + (apiStatus === "live" ? "bg-[var(--color-sev-low)]" : "bg-[var(--color-text-muted)] animate-pulse")} />
            {apiStatus === "live" ? "API LIVE" : "WAKING RENDER (FREE TIER)..."}
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-bold leading-[0.95] mb-6">
          Evidence does not
          <br />
          <span style={{ color: "var(--color-accent)" }}>investigate itself.</span>
        </h1>

        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-8">
          AegisAI is a multimodal AI agent that pulls together video, documents, structured
          records, and voice reports into one coherent investigation, built one phase at a
          time, with every design decision measured and documented, not assumed.
        </p>

        <div className="flex items-center gap-4">
          <a href="#incidents" className="inline-flex items-center gap-2 px-5 py-3 rounded font-medium text-sm transition-transform hover:scale-[1.02]" style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}>
            View Live Incident Feed <ArrowUpRight size={16} />
          </a>
          <a href="https://github.com/rudellll123/aegis-ai" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-3 rounded font-medium text-sm border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] transition-colors">
            View Source <Code2 size={16} />
          </a>
        </div>
      </section>

      <section id="incidents" className="relative z-10 px-8 py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-3xl font-bold">Live Incident Feed</h2>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              POSTGRESQL &middot; RENDER &middot; PHASE 7 + 10
            </span>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Real data from the deployed Postgres-backed API, not a mock. Search live below.
          </p>

          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search incidents (e.g. forklift, chemical)..."
              value={query}
              onChange={function (e) { setQuery(e.target.value); }}
              onKeyDown={function (e) { if (e.key === "Enter") loadIncidents(query); }}
              className="w-full pl-11 pr-4 py-3 rounded-lg font-mono text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>

          <div className="grid gap-3">
            {loading && incidents.length === 0 && (
              <div className="font-mono text-sm text-[var(--color-text-muted)] py-8 text-center">
                Waking the API, Render free tier sleeps when idle, this can take up to 50 seconds.
              </div>
            )}
            {!loading && incidents.length === 0 && (
              <div className="font-mono text-sm text-[var(--color-text-muted)] py-8 text-center">
                No incidents found.
              </div>
            )}
            {incidents.map(function (inc) {
              return (
                <div key={inc.id} className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)] transition-colors">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: severityColor(inc.severity) }}
                  />
                  <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{inc.id}</span>
                  <span className="flex-1 text-sm">{inc.title}</span>
                  <span
                    className="font-mono text-xs px-2 py-1 rounded shrink-0"
                    style={{ color: severityColor(inc.severity), backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    {inc.severity.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="architecture" className="relative z-10 px-8 py-20 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-2">Built One Phase at a Time</h2>
          <p className="text-[var(--color-text-secondary)] mb-12 max-w-2xl">
            Every phase shipped with a working component, a real design decision behind it,
            and honest documentation of what failed along the way.
          </p>

          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--color-border)]" />
            <div className="flex flex-col gap-10">
              {PHASES.map(function (phase) {
                return (
                  <div key={phase.num} className="relative pl-12">
                    <div
                      className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-medium border-2"
                      style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-bg)", color: "var(--color-accent)" }}
                    >
                      {phase.num}
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-display text-xl font-bold">{phase.title}</h3>
                      <CheckCircle2 size={16} color="var(--color-sev-low)" />
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 leading-relaxed max-w-2xl">
                      {phase.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {phase.tags.map(function (tag) {
                        return (
                          <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-8 py-10 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-[var(--color-text-muted)]">
          <span>Built by Rahul Jha</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/rudellll123/aegis-ai" target="_blank" rel="noopener" className="hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1.5">
              <Code2 size={14} /> Source
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
