'use client';
import { cn } from "../lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

const ROWS = 20;
const COLS = 20;
const TOTAL = ROWS * COLS;
const CENTER_R = ROWS / 2;
const CENTER_C = COLS / 2;

export default function BioGrid({ status }: { status: 'baseline' | 'attention' | 'threat' | 'recovery' }) {
  const timeRef = useRef(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      timeRef.current += 0.04;
      setTick(t => t + 1);
      raf = requestAnimationFrame(loop);
    };
    if (status === 'baseline' || status === 'attention') {
      raf = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(raf);
  }, [status]);

  const waveData = useMemo(() => {
    const arr = new Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const distFromCenter = Math.sqrt(
        (row - CENTER_R) ** 2 + (col - CENTER_C) ** 2
      );
      const maxDist = Math.sqrt(CENTER_R ** 2 + CENTER_C ** 2);
      arr[i] = { row, col, distFromCenter, distNorm: distFromCenter / maxDist };
    }
    return arr;
  }, []);

  const time = timeRef.current;

  return (
    <div className={cn(
      "relative h-full border flex items-center justify-center overflow-hidden bg-black/40 transition-colors duration-700",
      status === 'threat' && "border-[#FF003C]/50",
      status === 'attention' && "border-[#FFAA00]/50",
      status === 'baseline' && "border-[#00FF41]/30",
      status === 'recovery' && "border-white/30"
    )}>
      {/* Label */}
      <div className={cn(
        "absolute top-4 left-4 text-xs font-bold tracking-widest z-20 transition-colors duration-500",
        status === 'threat' && "text-[#FF003C]/80",
        status === 'attention' && "text-[#FFAA00]/80",
        status !== 'threat' && status !== 'attention' && "text-[#00FF41]/80"
      )}>
        HOLOGRAPHIC_ENTROPY_MESH
      </div>

      {/* Status readout */}
      <div className={cn(
        "absolute bottom-4 right-4 text-xl font-mono font-black tracking-widest z-20 transition-colors duration-300 tabular-nums",
        status === 'threat' && "text-[#FF003C]",
        status === 'attention' && "text-[#FFAA00]",
        status === 'baseline' && "text-[#00FF41]",
        status === 'recovery' && "text-white"
      )}>
        {status === 'threat' && "DETECTED: 7.992 BITS"}
        {status === 'attention' && "ANOMALOUS: 6.870 BITS"}
        {status === 'baseline' && "BASELINE: 3.500 BITS"}
        {status === 'recovery' && "NEUTRALIZED"}
      </div>

      {/* SVG connecting lines for threat state */}
      {status === 'threat' && (
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {waveData.map((d, i) => {
            const right = i + 1;
            const down = i + COLS;
            if (right < TOTAL && right % COLS !== 0 && d.distNorm < 0.6) {
              return (
                <line key={`h-${i}`}
                  x1={(d.col / COLS) * 100} y1={(d.row / ROWS) * 100}
                  x2={((d.col + 1) / COLS) * 100} y2={(d.row / ROWS) * 100}
                  stroke="#FF003C" strokeWidth="0.05" opacity={0.3 * (1 - d.distNorm)} />
              );
            }
            return null;
          })}
          {waveData.map((d, i) => {
            const down = i + COLS;
            if (down < TOTAL && d.distNorm < 0.6) {
              return (
                <line key={`v-${i}`}
                  x1={(d.col / COLS) * 100} y1={(d.row / ROWS) * 100}
                  x2={(d.col / COLS) * 100} y2={((d.row + 1) / ROWS) * 100}
                  stroke="#FF003C" strokeWidth="0.05" opacity={0.3 * (1 - d.distNorm)} />
              );
            }
            return null;
          })}
        </svg>
      )}

      {/* Node grid */}
      <div className={cn(
        "grid grid-cols-20 gap-3 p-12 transition-[scale,filter] duration-700 z-10",
        status === 'threat' && "scale-95 blur-[1px]",
        status === 'attention' && "scale-[0.98]"
      )}>
        {waveData.map((d, i) => {
          const waveVal = Math.sin(
            (d.row / ROWS) * Math.PI * 3 +
            (d.col / COLS) * Math.PI * 2 +
            time * 1.5
          );
          const breathe = 0.15 + (waveVal * 0.15 + 0.15);

          const isRed = status === 'threat';
          const isWhite = status === 'recovery';
          const isAmber = status === 'attention' &&
            (Math.sin(d.row * 2.7 + d.col * 1.3) > 0);

          let dotStyle: React.CSSProperties = {};
          let dotClass = "rounded-full duration-500 transition-[width,height,opacity,background-color,box-shadow] ";

          if (isRed) {
            const infectDelay = d.distNorm * 0.5;
            dotClass += "bg-[#FF003C]";
            dotStyle = {
              width: '6px',
              height: '6px',
              boxShadow: `0 0 ${6 + (1 - d.distNorm) * 14}px #FF003C`,
              animation: `threat-flash ${0.6 + d.distNorm * 0.8}s ease-in-out infinite`,
              animationDelay: `${infectDelay}s`,
              opacity: 1,
            };
          } else if (isWhite) {
            const cureDelay = d.distNorm * 1.5;
            dotClass += "bg-white";
            dotStyle = {
              width: '6px',
              height: '6px',
              boxShadow: '0 0 20px white',
              animation: `recovery-surge 1.2s ease-out forwards`,
              animationDelay: `${cureDelay}s`,
              opacity: 0,
            };
          } else if (isAmber) {
            const flicker = 0.6 + Math.sin(time * 3 + i * 0.7) * 0.3;
            dotClass += "bg-[#FFAA00]";
            dotStyle = {
              width: '5px',
              height: '5px',
              boxShadow: `0 0 ${6 + flicker * 6}px #FFAA00`,
              opacity: flicker,
            };
          } else {
            dotClass += "bg-[#00FF41]";
            dotStyle = {
              width: '4px',
              height: '4px',
              opacity: breathe,
              transition: 'none',
            };
          }

          return <div key={i} className={dotClass} style={dotStyle} />;
        })}
      </div>
    </div>
  );
}
