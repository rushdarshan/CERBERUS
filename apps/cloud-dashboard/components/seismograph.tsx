import { useMemo } from "react";

export default function Seismograph({ history, alert }: { history: any[], alert: any }) {
  
  // GD-03: Visual Injection Logic
  // We merge the persistent DB history with the live temporary threat
  const visualData = useMemo(() => {
    if (!alert) return history;
    
    // Create a temporary "Spike" point
    const attackPoint = {
      entropy: alert.entropyScore || 7.99, // Use the payload score or fallback to WannaCry level
      timestamp: Date.now()
    };
    
    // Return history + the spike
    return [...history, attackPoint];
  }, [history, alert]);

  // Calculate SVG points based on the new combined data
  const points = visualData.length > 1 
    ? visualData.map((d, i) => {
        const x = (i / (visualData.length - 1)) * 100;
        const y = 100 - (d.entropy / 8) * 100; // Map 0-8 entropy to 0-100 height
        return `${x},${y}`;
      }).join(' ')
    : "0,100 100,100";

  const peakEntropy = alert?.entropyScore != null ? Number(alert.entropyScore).toFixed(2) : null;

  return (
    <div className={`flex-1 border p-4 relative transition-colors duration-300 ${alert ? "border-[#FF003C]/50 bg-[#FF003C]/10" : "border-[#00FF41]/20 bg-black/60"}`}>
      <div className={`text-[10px] mb-2 font-bold opacity-60 ${alert ? "text-[#FF003C]" : "text-[#00FF41]"}`}>
        {alert ? ">>> ANOMALY_DETECTED" : "ENTROPY_SIGNATURE"}
      </div>
      
      <div className="h-32 border-b border-white/10 overflow-hidden relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* The Graph Line */}
          <polyline 
            fill="none" 
            stroke={alert ? "#FF003C" : "#00FF41"} 
            strokeWidth={alert ? "2" : "1"} 
            vectorEffect="non-scaling-stroke"
            points={points} 
            className="transition-[stroke] duration-300" 
          />
        </svg>
        
        {/* Entropy value label at peak */}
        {peakEntropy && (
          <div className="absolute top-0 right-0 text-xs font-mono font-bold text-[#FF003C] animate-pulse tabular-nums">
            {peakEntropy}
          </div>
        )}
        
        {/* Baseline Indicator (The "Safe" Zone) */}
        <div className="absolute top-[55%] left-0 w-full h-[1px] bg-white/10 border-t border-dashed border-white/20" />
      </div>
    </div>
  );
}
