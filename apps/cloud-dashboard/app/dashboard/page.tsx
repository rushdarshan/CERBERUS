'use client';
import { useEffect, useRef, useState } from 'react';
import BioGrid from '../../components/bio-grid';
import KillCam from '../../components/kill-cam';
import Seismograph from '../../components/seismograph';
import SimulationDeck from '../../components/simulation-deck';
import ActiveLog from '../../components/active-log';
import ThreatAnalysis from '../../components/threat-analysis';
import { usePusher } from '../../hooks/use-pusher';
import { cn } from "../../lib/utils";

type Status = 'baseline' | 'attention' | 'threat' | 'recovery';

export default function Dashboard() {
  const pusherData = usePusher('critical-alert', 'threat-detected');
  const [alert, setAlert] = useState<any>(null);
  const [status, setStatus] = useState<Status>('baseline');
  const [history, setHistory] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [feedback, setFeedback] = useState<{ type: string; msg: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initRef = useRef<HTMLDivElement | null>(null);
  const attentionTimer = useRef<NodeJS.Timeout | null>(null);
  const recoveryTimer = useRef<NodeJS.Timeout | null>(null);
  const threatTimer = useRef<NodeJS.Timeout | null>(null);

  const refreshHistory = async () => {
    const res = await fetch('/api/simulation/history', { cache: 'no-store' });
    const data = await res.json();
    setHistory(data);
  };

  const clearAttention = () => {
    if (attentionTimer.current) clearTimeout(attentionTimer.current);
    attentionTimer.current = setTimeout(() => setStatus('baseline'), 5000);
  };

  const handleAttention = () => {
    setStatus('attention');
    clearAttention();
  };

  const handleThreat = (alertData?: any) => {
    setStatus('threat');
    if (alertData) {
      setAlert(alertData);
    } else {
      setAlert({
        fileName: 'simulated_pathogen.exe',
        entropyScore: 8.124,
        machineId: 'VM-00' + Math.floor(Math.random() * 99),
        hexDump: '4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00',
      });
    }
    if (audioRef.current && initialized) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (attentionTimer.current) clearTimeout(attentionTimer.current);
    if (threatTimer.current) clearTimeout(threatTimer.current);
    threatTimer.current = setTimeout(() => {
      setStatus('recovery');
      if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
      recoveryTimer.current = setTimeout(() => setStatus('baseline'), 3000);
    }, 6000);
  };

  const handleInit = () => {
    if (initRef.current) {
      initRef.current.style.animation = 'panel-exit 0.3s ease-in forwards';
      initRef.current.style.pointerEvents = 'none';
    }
    setTimeout(() => setInitialized(true), 350);
  };

  useEffect(() => {
    if (initialized) refreshHistory();
  }, [initialized]);

  useEffect(() => {
    if (pusherData) {
      handleThreat(pusherData);
    }
  }, [pusherData, initialized]);

  useEffect(() => {
    if (!initialized) setStatus('baseline');
  }, [initialized]);

  const panels = [
    { key: 'killcam', node: <KillCam alert={alert} />, cols: 'col-span-3 row-span-4', delay: 0 },
    { key: 'biogrid', node: <BioGrid status={status} />, cols: 'col-span-6 row-span-5', delay: 80 },
    { key: 'right-col', node: (
      <div className="flex flex-col gap-3 h-full">
        <Seismograph history={history} alert={alert} />
        <ThreatAnalysis alert={alert} />
        <ActiveLog status={status} alert={alert} />
        {feedback && (
          <div className={cn(
            "text-right font-mono text-[10px] tracking-[0.2em] uppercase select-none mt-1 animate-pulse transition-all duration-300",
            feedback.type === 'neon' && "text-[#00FF41]",
            feedback.type === 'alert' && "text-[#FF003C]",
            feedback.type === 'attention' && "text-[#FFAA00]",
          )}>
            &gt;&gt;&gt; {feedback.msg}
          </div>
        )}
      </div>
    ), cols: 'col-span-3 row-span-5', delay: 160 },
    { key: 'deck', node: (
      <SimulationDeck
        onRefresh={refreshHistory}
        onAttention={handleAttention}
        onThreat={handleThreat}
        setFeedback={setFeedback}
      />
    ), cols: 'col-span-3 row-span-2 self-end', delay: 280 },
  ];

  return (
    <main className={cn(
      "relative h-screen w-screen p-6 transition-colors duration-700",
      status === 'threat' && "bg-red-950/40",
      status === 'attention' && "bg-amber-950/30",
      status !== 'threat' && status !== 'attention' && "bg-black"
    )}>
      {/* Init overlay with imperative exit animation */}
      {!initialized && (
        <div ref={initRef} className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
          <button onClick={handleInit} className="btn--active bg-[#00FF41] text-black px-10 py-4 font-black transition-transform duration-150">
            Initialize Cerberus Mesh
          </button>
        </div>
      )}

      {/* Threat countdown bar */}
      {status === 'threat' && (
        <div className="fixed top-0 left-0 w-screen h-[3px] z-50 pointer-events-none">
          <div className="h-full bg-[#FF003C] shadow-[0_0_10px_#FF003C] animate-[threat-countdown_6s_linear_forwards]" />
        </div>
      )}

      {/* Recovery pulse indicator */}
      {status === 'recovery' && (
        <div className="fixed top-0 left-0 w-screen h-[3px] z-50 pointer-events-none bg-white shadow-[0_0_10px_white] animate-[pulse-white_1s_ease-in-out_3]" />
      )}

      <audio ref={audioRef} src="/alerts.mp3" preload="auto" />
      <div className={cn(
        "scanner-line",
        status === 'attention' && "scanner-line--slow",
        status === 'threat' && "scanner-line--stopped"
      )} />

      {initialized && (
        <div className="grid grid-cols-12 grid-rows-6 gap-6 h-[88vh] relative z-10">
          {panels.map(p => (
            <div key={p.key} className={p.cols}
              style={{
                opacity: 0,
                animation: `panel-enter 0.4s ease-out ${p.delay}ms forwards`,
              }}>
              {p.node}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
