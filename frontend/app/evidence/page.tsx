"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { searchEvidence } from "@/lib/api";
import { Search, Loader2, FileText, AlertTriangle } from "lucide-react";

type EvidenceResult = {
  text: string;
  doc_id: string;
  score: number;
  rerank_score: number;
};

export default function Evidence() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EvidenceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  function runSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    searchEvidence(query)
      .then(function (data) {
        setResults(data.results);
        setLoading(false);
      })
      .catch(function () {
        setError("Could not reach the local RAG API at localhost:8002. Make sure local_vision_api is running.");
        setLoading(false);
      });
  }

  return (
    <main className="relative min-h-screen">
      <div className="noise-overlay" />
      <Nav />

      <section className="relative z-10 px-8 py-12 max-w-5xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-1">Evidence Search</h1>
        <p className="text-[var(--color-text-secondary)] mb-2 text-sm max-w-2xl">
          Real hybrid retrieval (dense embeddings + BM25 keyword search) with cross-encoder reranking, from Phase 2.
          Local API only, same as Video Analysis.
        </p>
        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-8">
          Try: PPE requirements, forklift, vehicle clearance distance
        </p>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search safety policies and incident reports..."
            value={query}
            onChange={function (e) { setQuery(e.target.value); }}
            onKeyDown={function (e) { if (e.key === "Enter") runSearch(); }}
            className="w-full pl-11 pr-24 py-3 rounded-lg font-mono text-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <button
            onClick={runSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded text-xs font-medium"
            style={{ backgroundColor: "var(--color-accent)", color: "#0a0a0c" }}
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)]">
            <Loader2 size={16} className="animate-spin" /> Running hybrid search + reranking...
          </div>
        ) : null}

        {error ? (
          <div className="flex items-start gap-2 p-4 rounded-lg border border-[var(--color-sev-high)] text-[var(--color-sev-high)] text-sm font-mono">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        ) : null}

        {!loading && !error && searched && results.length === 0 ? (
          <div className="font-mono text-sm text-[var(--color-text-muted)] py-8">No results found.</div>
        ) : null}

        <div className="grid gap-3">
          {results.map(function (r, i) {
            return (
              <div key={r.doc_id + i} className="p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={14} color="var(--color-accent)" />
                  <span className="font-mono text-xs" style={{ color: "var(--color-accent)" }}>{r.doc_id}</span>
                  <span className="font-mono text-xs text-[var(--color-text-muted)] ml-auto">rerank score: {r.rerank_score.toFixed(2)}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{r.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
