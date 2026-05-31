'use client';
import { useEffect, useState } from 'react';
import { cn } from "../lib/utils";

export default function ThreatAnalysis({ alert }: { alert: any }) {
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!alert) {
      setLines(null);
      return;
    }

    setLoading(true);
    setLines(null);

    const controller = new AbortController();

    fetch('/api/analyze-threat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(data => {
        if (data.lines) setLines(data.lines);
        else setLines(['AI analysis unavailable']);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [alert]);

  if (!alert) return null;

  return (
    <div className="border border-[#FF003C]/50 bg-[#FF003C]/5 p-3 font-mono text-[10px] transition-colors duration-300">
      <div className="text-[#FF003C] font-bold text-[10px] mb-2 border-b border-[#FF003C]/20 pb-1">
        {loading ? 'AI_ANALYZING...' : 'AI_THREAT_BRIEFING'}
      </div>
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-3 bg-[#FF003C]/10 animate-pulse rounded" />
          ))}
        </div>
      ) : lines ? (
        <div className="space-y-1">
          {lines.map((line, i) => (
            <div key={i} className={cn(
              "opacity-80",
              i === 0 && "text-[#FF003C] font-bold",
              i === 1 && "text-[#FF003C]/80",
              i === 2 && "text-[#FF003C]/60",
            )}>
              {line}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
