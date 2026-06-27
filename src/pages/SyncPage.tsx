import React from 'react';
import {
  Bot,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import BotWatermark from '../components/BotWatermark';

interface SyncPageProps {
  loadingProgress: number;
  loadingStatusText: string;
}

export default function SyncPage({ loadingProgress, loadingStatusText }: SyncPageProps) {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-6 bg-slate-950 overflow-hidden font-sans">
      
      {/* Neural and grid background decors */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.03] shrink-0 animate-pulse-slow">
          <BotWatermark size="100%" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-96 grid-floor opacity-30 pointer-events-none z-0"></div>

      {/* Golden glow light source behind */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#BF953F]/5 blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-xl bg-slate-950/90 rounded-[28px] border border-[#BF953F]/30 gold-border-glow p-8 md:p-10 space-y-8 relative z-10 overflow-hidden backdrop-blur-xl text-center">
        
        {/* Header: Rotating neural sync indicator */}
        <div className="space-y-3 relative z-10">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-[#BF953F]/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-amber-400 border-r-amber-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Bot className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Sincronizando Sistema Neural</h2>
            <p className="text-[10px] text-slate-400 font-mono">ESTABELECENDO CANAL DE ALTA VELOCIDADE</p>
          </div>
        </div>

        {/* Neural Checklists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left bg-slate-900/40 p-4 rounded-2xl border border-slate-900/80 font-mono text-[10px] relative z-10">
          <div id="syncVpsStatus" className="flex items-center space-x-2.5 py-1">
            {loadingProgress >= 15 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            )}
            <span className={loadingProgress >= 15 ? 'text-slate-300' : 'text-slate-500'}>Conectado à VPS Segura</span>
          </div>

          <div id="syncApiStatus" className="flex items-center space-x-2.5 py-1">
            {loadingProgress >= 30 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              loadingProgress >= 15 ? (
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-800 shrink-0" />
              )
            )}
            <span className={loadingProgress >= 30 ? 'text-slate-300' : 'text-slate-500'}>Autenticação de API</span>
          </div>

          <div id="syncAiStatus" className="flex items-center space-x-2.5 py-1">
            {loadingProgress >= 60 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              loadingProgress >= 30 ? (
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-800 shrink-0" />
              )
            )}
            <span className={loadingProgress >= 60 ? 'text-slate-300' : 'text-slate-500'}>Motor Inteligência Artificial</span>
          </div>

          <div id="syncSignalsStatus" className="flex items-center space-x-2.5 py-1">
            {loadingProgress >= 90 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              loadingProgress >= 60 ? (
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-800 shrink-0" />
              )
            )}
            <span className={loadingProgress >= 90 ? 'text-slate-300' : 'text-slate-500'}>Sincronização de Sinais</span>
          </div>
        </div>

        {/* Central Progress Bar */}
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <span className="text-amber-400 uppercase tracking-widest text-[9px] animate-pulse">
              {loadingStatusText}
            </span>
            <span id="syncPercentage" className="text-white font-black">{loadingProgress}%</span>
          </div>

          {/* Styled horizontal progress track */}
          <div id="syncProgress" className="w-full h-3.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[2px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] shadow-[0_0_10px_rgba(191,149,63,0.5)] transition-all duration-100 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Simulated Live Console Logs */}
        <div id="syncLogs" className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-[10px] font-mono text-left space-y-1.5 h-32 overflow-y-auto max-h-32 text-slate-400 relative z-10">
          <div className="text-amber-400/80">&gt;&gt;&gt; SYSTEM INITIALIZATION ROUTINE STARTED</div>
          <div>[SECURE] Connected to host server cluster</div>
          {loadingProgress >= 15 && <div className="text-emerald-400">[OK] Handshake completed successfully. Encryption standard: AES-256-GCM.</div>}
          {loadingProgress >= 30 && <div className="text-emerald-400">[OK] Credentials accepted by broker. Current API latency: 12ms.</div>}
          {loadingProgress >= 45 && <div className="text-amber-400/70">[IA Engine] Initiating multilayer neural pattern matching arrays...</div>}
          {loadingProgress >= 60 && <div className="text-emerald-400">[OK] Deep-learning backtest data fetched. Accuracy weight verified at 94.6%.</div>}
          {loadingProgress >= 75 && <div className="text-amber-400/70">[VPS Tracker] Connecting to real-time market ticks stream feed...</div>}
          {loadingProgress >= 90 && <div className="text-emerald-400">[OK] Connection to broker ticker stable. Ready for manual call/put inputs.</div>}
          {loadingProgress >= 98 && <div className="text-amber-300 font-bold animate-pulse">[READY] All modules successfully loaded! Mounting interactive GUI...</div>}
        </div>

        {/* Bottom info */}
        <div className="text-[9px] text-slate-500 font-mono relative z-10">
          VPS IP: 45.179.88.22 • PORT: 3000 • CHAVE SEC: SHA-256 • BOT IA V3.5.0
        </div>

      </div>

    </div>
  );
}
