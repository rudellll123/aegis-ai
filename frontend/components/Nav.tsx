"use client";

import Link from "next/link";
import { AlertTriangle, Code2 } from "lucide-react";

export function Nav() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-[var(--color-border-subtle)]">
      <Link href="/" className="flex items-center gap-2">
        <AlertTriangle size={20} color="var(--color-accent)" strokeWidth={2.5} />
        <span className="font-display text-lg font-bold tracking-tight">
          AEGIS<span style={{ color: "var(--color-accent)" }}>AI</span>
        </span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
        <Link href="/dashboard" className="hover:text-[var(--color-text-primary)] transition-colors">Dashboard</Link>
        <Link href="/incidents" className="hover:text-[var(--color-text-primary)] transition-colors">Incidents</Link>
        <Link href="/architecture" className="hover:text-[var(--color-text-primary)] transition-colors">Architecture</Link>
        <a href="https://github.com/rudellll123/aegis-ai" target="_blank" rel="noopener" className="hover:text-[var(--color-text-primary)] transition-colors">
          <Code2 size={18} />
        </a>
      </div>
    </nav>
  );
}
