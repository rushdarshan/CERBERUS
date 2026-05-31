'use client';
import { useEffect, useState, useRef } from 'react';
import { cn } from "../lib/utils";

export default function ActiveLog({ status, alert }: { status: 'baseline' | 'attention' | 'threat' | 'recovery', alert?: any }) {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const ts = new Date().toLocaleTimeString();
      if (status === 'threat') {
        const entropy = alert?.entropyScore?.toFixed(2) || '7.99';
        const file = alert?.fileName || 'UNKNOWN_PAYLOAD';
        setLogs(prev => [
          ...prev.slice(-11),
          `[${ts}] >>> ANOMALY_DETECTED :: entropy ${entropy} bits :: ${file}`,
          `[${ts}] >>> ACTION: ENFORCE_KILL :: PID (${alert?.machineId || 'NODE-01'})`,
        ]);
      } else if (status === 'attention') {
        const msgs = [
          `[${ts}] >>> ANOMALY_DETECTED: entropy=6.87 (p=0.03)`,
          `[${ts}] FILE_SYSTEM_SCAN: 2/2048 anomalous`,
          `[${ts}] ENTROPY_WATCHDOG: threshold breached`,
          `[${ts}] RSA_VAULT::INTEGRITY_CHECK_PASS`,
        ];
        setLogs(prev => [...prev.slice(-12), msgs[Math.floor(Math.random() * msgs.length)]]);
      } else {
        setLogs(prev => [...prev.slice(-12), `[${ts}] RSA_VAULT::INTEGRITY_CHECK_PASS`]);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  return (
    <div className={cn(
      "flex-1 border p-3 font-mono text-[10px] overflow-hidden flex flex-col transition-colors duration-500",
      status === 'threat' && "border-[#FF003C]/50 bg-[#FF003C]/10",
      status === 'attention' && "border-[#FFAA00]/50 bg-[#FFAA00]/5",
      status !== 'threat' && status !== 'attention' && "border-[#00FF41]/30 bg-black/80"
    )}>
      <div className={cn(
        "text-[10px] mb-2 font-bold opacity-60 border-b pb-1 transition-colors duration-300",
        status === 'threat' && "border-[#FF003C]/20 text-[#FF003C]",
        status === 'attention' && "border-[#FFAA00]/20 text-[#FFAA00]",
        status !== 'threat' && status !== 'attention' && "border-[#00FF41]/20 text-[#00FF41]"
      )}>
        CORE_LOG
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className={
            log.includes("CRITICAL")
              ? "text-[#FF003C] animate-pulse font-bold"
              : log.includes("ANOMALY") || log.includes("anomalous") || log.includes("threshold")
                ? "text-[#FFAA00] font-bold"
                : "text-[#00FF41]/60"
          }>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
