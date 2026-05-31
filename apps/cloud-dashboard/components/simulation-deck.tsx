'use client';
import { useState } from 'react';
import { cn } from "../lib/utils";

export default function SimulationDeck({
  onRefresh,
  onAttention,
  onThreat,
  setFeedback,
}: {
  onRefresh: () => void;
  onAttention?: () => void;
  onThreat?: () => void;
  setFeedback: (fb: { type: string; msg: string } | null) => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const train = async () => {
    setLoading('train');
    setFeedback(null);
    await fetch('/api/simulation/train', { method: 'POST' });
    setLoading(null);
    setFeedback({ type: 'neon', msg: 'TRAINING COMPLETE' });
    onRefresh();
    setTimeout(() => setFeedback(null), 2000);
  };

  const attack = async () => {
    setLoading('attack');
    setFeedback(null);
    await fetch('/api/simulation/attack', { method: 'POST' });
    setLoading(null);
    setFeedback({ type: 'alert', msg: 'PATHOGEN INJECTED' });
    onThreat?.();
    setTimeout(() => setFeedback(null), 2000);
  };

  const amberAlert = () => {
    setLoading('amber');
    setFeedback(null);
    setTimeout(() => {
      setLoading(null);
      setFeedback({ type: 'attention', msg: 'ATTENTION TRIGGERED' });
      onAttention?.();
      setTimeout(() => setFeedback(null), 2500);
    }, 800);
  };

  return (
    <div className="flex gap-4 p-4 border border-[#00FF41]/20 bg-black/60 w-full h-full">
      <button
        onClick={train}
        disabled={loading !== null}
        className={cn(
          "flex-1 p-3 border transition-colors font-mono text-xs btn--active",
          loading === 'train'
            ? "border-[#00FF41]/50 text-[#00FF41]/50 animate-pulse"
            : "border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
        )}
      >
        {loading === 'train' ? 'TRAINING...' : 'TRAIN NORMAL'}
      </button>

      <button
        onClick={attack}
        disabled={loading !== null}
        className={cn(
          "flex-1 p-3 border transition-colors font-mono text-xs btn--active",
          loading === 'attack'
            ? "border-[#FF003C]/50 text-[#FF003C]/50 animate-pulse"
            : "border-[#FF003C] text-[#FF003C] hover:bg-[#FF003C] hover:text-white"
        )}
      >
        {loading === 'attack' ? 'INJECTING...' : 'INJECT PATHOGEN'}
      </button>

      <button
        onClick={amberAlert}
        disabled={loading !== null}
        className={cn(
          "flex-1 p-3 border transition-colors font-mono text-xs btn--active",
          loading === 'amber'
            ? "border-[#FFAA00]/50 text-[#FFAA00]/50 animate-pulse"
            : "border-[#FFAA00] text-[#FFAA00] hover:bg-[#FFAA00] hover:text-black"
        )}
      >
        {loading === 'amber' ? 'SCANNING...' : 'AMBER ALERT'}
      </button>
    </div>
  );
}
