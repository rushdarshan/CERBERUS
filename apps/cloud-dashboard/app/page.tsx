'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Landing() {
  const router = useRouter();
  const [bootPhase, setBootPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBootPhase(p => (p < 3 ? p + 1 : p)), 800);
    return () => clearInterval(t);
  }, []);

  const initializeLink = () => {
    setTimeout(() => router.push('/dashboard'), 200);
  };

  const dots = '.'.repeat(bootPhase);

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center space-y-10">

        {/* Boot sequence */}
        <div className="font-mono text-[#00FF41]/40 text-[11px] tracking-[0.3em] uppercase"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.1s forwards' }}>
          BOOT_SEQUENCE_INIT{dots}
        </div>

        {/* CERBERUS title with glitch layers */}
        <div className="relative"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.25s forwards' }}>
          <h1 className="text-7xl font-black text-[#00FF41] tracking-[0.15em] select-none">
            CERBERUS
          </h1>
          <h1 className="text-7xl font-black text-[#FF003C] tracking-[0.15em] select-none absolute inset-0 mix-blend-screen animate-pulse" aria-hidden>
            CERBERUS
          </h1>
        </div>

        {/* Tagline */}
        <div className="font-mono text-xs tracking-[0.3em] text-[#00FF41]/40 uppercase"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.4s forwards' }}>
          Adaptive Digital Immune System
        </div>

        {/* Animated status bar */}
        <div className="w-80 h-[1px] bg-[#00FF41]/20 relative overflow-hidden"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.55s forwards' }}>
          <div className="absolute inset-0 bg-[#00FF41] animate-[scan_3s_linear_infinite] opacity-40"
            style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Capability pills */}
        <div className="flex gap-3 text-[10px] font-mono tracking-widest"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.7s forwards' }}>
          {['ENTROPY_SCAN', 'THREAT_DETECT', 'MEMORY_FORENSICS'].map((cap, i) => (
            <div key={cap}
              className="border border-[#00FF41]/20 px-3 py-1.5 text-[#00FF41]/50">
              {cap}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={initializeLink}
           className="px-12 py-4 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black text-sm tracking-[0.3em] transition-colors duration-300 uppercase btn--active"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 0.85s forwards' }}
        >
          Initialize Link
        </button>

        {/* Version / node info */}
        <div className="font-mono text-[10px] text-[#00FF41]/20 tracking-wider"
          style={{ opacity: 0, animation: 'panel-enter 0.5s ease-out 1s forwards' }}>
          NODE v2.4.1 | PROTOCOL: WSS | STATUS: STANDBY
        </div>
      </div>
    </div>
  );
}
