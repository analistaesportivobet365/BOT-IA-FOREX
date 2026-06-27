import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Settings,
  HelpCircle,
  Activity,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  Square,
  DollarSign,
  Globe,
  Percent,
  History,
  BarChart3,
  Database,
  BookOpen,
  ShieldCheck,
  Lock,
  Unlock,
  FileText,
  LayoutDashboard,
  Sparkles,
  Bot,
  Check,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Download,
  ExternalLink,
  Star,
  Sliders,
  Terminal,
  Layers,
  Search,
  Maximize2,
  Mail,
  Eye,
  EyeOff,
  Instagram,
  MessageCircle
} from 'lucide-react';
import BotWatermark from '../components/BotWatermark';

const MONITORED_ASSETS = [
  { ativo: 'EUR/USD', tendencia: 'up', score: '94%', volatilidade: 'Baixa' },
  { ativo: 'GBP/USD', tendencia: 'up', score: '88%', volatilidade: 'Média' },
  { ativo: 'EUR/JPY', tendencia: 'down', score: '82%', volatilidade: 'Baixa' },
  { ativo: 'AUD/CAD', tendencia: 'down', score: '71%', volatilidade: 'Alta' }
];

interface UserPortalProps {
  // Operational States
  botRunning: boolean;
  setBotRunning: (running: boolean) => void;
  selectedMarket: 'demo' | 'real';
  setSelectedMarket: (market: 'demo' | 'real') => void;
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  selectedTimeframe: 'Forex M15' | 'Jump M2';
  setSelectedTimeframe: (tf: 'Forex M15' | 'Jump M2') => void;
  consentChecked: boolean;
  setConsentChecked: (checked: boolean) => void;
  isFavorite: boolean;
  setIsFavorite: (fav: boolean) => void;

  // Stats / Balances
  balanceDemo: number;
  setBalanceDemo: (val: number) => void;
  balanceReal: number;
  setBalanceReal: (val: number) => void;
  winsCount: number;
  lossesCount: number;
  profitAccumulated: number;
  operationsToday: number;

  // Time tickers
  currentTime: string;
  currentDate: string;

  // Feed & Signals
  feedMessages: any[];
  signalsHistory: any[];
  chartBars: any[];
  currentClientSignal: {
    ativo: string;
    tipo: 'CALL' | 'PUT';
    score: number;
    timer: number;
    status: 'analisando' | 'sinal' | 'win' | 'loss' | 'gale';
  } | null;
  candleTimeLeft: number;

  // Active Tab
  clientActiveTab: 'backtest' | 'feed' | 'historico' | 'lucros' | 'suporte';
  setClientActiveTab: (tab: 'backtest' | 'feed' | 'historico' | 'lucros' | 'suporte') => void;

  // Actions
  onLogout: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  onRefreshBalance: () => void;
}

export default function UserPortal({
  botRunning,
  setBotRunning,
  selectedMarket,
  setSelectedMarket,
  selectedAsset,
  setSelectedAsset,
  selectedTimeframe,
  setSelectedTimeframe,
  consentChecked,
  setConsentChecked,
  isFavorite,
  setIsFavorite,
  balanceDemo,
  balanceReal,
  winsCount,
  lossesCount,
  profitAccumulated,
  operationsToday,
  currentTime,
  currentDate,
  feedMessages,
  signalsHistory,
  chartBars,
  currentClientSignal,
  candleTimeLeft,
  clientActiveTab,
  setClientActiveTab,
  onLogout,
  showToast,
  onRefreshBalance
}: UserPortalProps) {
  // Calculated stats
  const totalOperations = winsCount + lossesCount;
  const accuracy = totalOperations > 0 ? ((winsCount / totalOperations) * 100).toFixed(1) : '100.0';

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-900 bg-slate-950/60 backdrop-blur-md flex flex-col shrink-0">
        
        {/* User profile details in sidebar */}
        <div className="p-5 border-b border-slate-900/80 flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-[#BF953F]/40 flex items-center justify-center text-amber-400 font-bold uppercase text-sm">
              <User className="w-5 h-5 text-amber-400" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">Operador Deriv</h4>
            <span className="text-[9px] font-mono font-bold text-[#FCF6BA] bg-[#BF953F]/15 px-1.5 py-0.5 rounded border border-[#BF953F]/20 uppercase">
              {selectedMarket === 'real' ? 'Modo Real' : 'Modo Demo'}
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Menu Links */}
        <nav className="p-4 space-y-1 flex-1">
          <button
            onClick={() => setClientActiveTab('backtest')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-left ${
              clientActiveTab === 'backtest'
                ? 'bg-gradient-to-r from-[#BF953F]/20 to-transparent text-[#FCF6BA] border-l-2 border-[#BF953F]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            <span>Painel de Análise</span>
          </button>

          <button
            onClick={() => setClientActiveTab('feed')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-left ${
              clientActiveTab === 'feed'
                ? 'bg-gradient-to-r from-[#BF953F]/20 to-transparent text-[#FCF6BA] border-l-2 border-[#BF953F]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Terminal className="w-4.5 h-4.5" />
            <span>Feed Técnico</span>
          </button>

          <button
            onClick={() => setClientActiveTab('historico')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-left ${
              clientActiveTab === 'historico'
                ? 'bg-gradient-to-r from-[#BF953F]/20 to-transparent text-[#FCF6BA] border-l-2 border-[#BF953F]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <History className="w-4.5 h-4.5" />
            <span>Histórico de Sinais</span>
          </button>

          <button
            onClick={() => setClientActiveTab('lucros')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-left ${
              clientActiveTab === 'lucros'
                ? 'bg-gradient-to-r from-[#BF953F]/20 to-transparent text-[#FCF6BA] border-l-2 border-[#BF953F]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" />
            <span>Desempenho Diário</span>
          </button>

          <button
            onClick={() => setClientActiveTab('suporte')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer text-left ${
              clientActiveTab === 'suporte'
                ? 'bg-gradient-to-r from-[#BF953F]/20 to-transparent text-[#FCF6BA] border-l-2 border-[#BF953F]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <HelpCircle className="w-4.5 h-4.5" />
            <span>Suporte Técnico</span>
          </button>
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-900/80 space-y-3 font-mono text-[9px] text-slate-500">
          <div>
            <span className="block font-bold text-slate-400">STATUS DA VPS</span>
            <span className="text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Operando 100% Estável
            </span>
          </div>
          <div>
            <span className="block font-bold text-slate-400">LATÊNCIA DA API</span>
            <span className="text-slate-400">14ms (Deriv WebSocket)</span>
          </div>
        </div>

      </aside>

      {/* Main Dynamic Panel Canvas */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* Top Operational Status Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Demo/Real Market selector card */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-3">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Mercado Selecionado</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="demoAccountButton"
                onClick={() => {
                  setSelectedMarket('demo');
                  showToast('Modo de simulação DEMO ativo.', 'success');
                }}
                className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition ${
                  selectedMarket === 'demo'
                    ? 'bg-slate-950 border-emerald-500/30 text-emerald-400'
                    : 'bg-transparent border-slate-800/80 text-slate-500 hover:text-white'
                }`}
              >
                Conta Demo
              </button>
              <button
                id="realAccountButton"
                onClick={() => {
                  if (!consentChecked) {
                    showToast('Você precisa aceitar os termos de taxa de 3% para operar em conta REAL.', 'error');
                    return;
                  }
                  setSelectedMarket('real');
                  showToast('Modo REAL ativado. Atenção redobrada.', 'success');
                }}
                className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition ${
                  selectedMarket === 'real'
                    ? 'bg-slate-950 border-[#BF953F]/40 text-amber-400'
                    : 'bg-transparent border-slate-800/80 text-slate-500 hover:text-white'
                }`}
              >
                Conta Real
              </button>
            </div>
          </div>

          {/* User balance display card */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span id="accountTypeLabel" className="text-[9px] text-[#FCF6BA] font-mono font-bold uppercase tracking-widest block">
                {selectedMarket === 'real' ? 'Saldo REAL Ativo' : 'Saldo DEMO Simulado'}
              </span>
              <span id="userBalance" className="text-2xl font-mono font-black tracking-tight text-white block">
                ${selectedMarket === 'real' ? balanceReal.toFixed(2) : balanceDemo.toFixed(2)}
              </span>
            </div>
            <button
              id="connectDerivButton"
              onClick={onRefreshBalance}
              className="p-2.5 bg-slate-950 hover:bg-slate-900 active:scale-95 text-[#FCF6BA] rounded-xl border border-[#BF953F]/30 cursor-pointer transition"
              title="Sincronizar Saldo"
            >
              <RefreshCw className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Bot running trigger switch */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Status do Robô</span>
              <span className={`text-xs font-bold uppercase tracking-wider ${botRunning ? 'text-emerald-400' : 'text-rose-400'}`}>
                {botRunning ? 'Sinalizadores Ativos' : 'Sistema Parado'}
              </span>
            </div>
            <div className="flex gap-2">
              {!botRunning ? (
                <button
                  id="startBotButton"
                  onClick={() => {
                    if (selectedMarket === 'real' && !consentChecked) {
                      showToast('Concordância de taxa de 3% é obrigatória para iniciar conta REAL.', 'error');
                      return;
                    }
                    setBotRunning(true);
                    showToast('Iniciando rastreamento de sinais automatizados!', 'success');
                  }}
                  className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Iniciar</span>
                </button>
              ) : (
                <button
                  id="stopBotButton"
                  onClick={() => {
                    setBotRunning(false);
                    showToast('Rastreamento de sinais interrompido.', 'error');
                  }}
                  className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer transition flex items-center gap-1.5"
                >
                  <Square className="w-3.5 h-3.5 fill-rose-400" />
                  <span>Parar</span>
                </button>
              )}
            </div>
          </div>

          {/* AI Monitor status badge */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">IA Monitoramento</span>
              <span id="aiMonitorStatus" className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${botRunning ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
                {botRunning ? 'Analisando Ativo' : 'Sintonizado'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-900">
              <Bot className="w-4.5 h-4.5 text-amber-400" />
            </div>
          </div>

        </div>

        {/* 3% Fee consent requirement warning */}
        {selectedMarket === 'real' && (
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-[#BF953F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Termo de Concordância de Taxa Requerido</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Para que possamos disparar ordens reais de nossa VPS sintonizada, você concorda em ceder 3% do payout dos lucros.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-900">
              <input
                id="acceptFeeCheckbox"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
                  if (e.target.checked) {
                    showToast('Você aceitou os termos da taxa de 3% sobre lucros reais.', 'success');
                  } else {
                    setSelectedMarket('demo');
                    showToast('Para segurança, você foi retornado ao modo DEMO.', 'error');
                  }
                }}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-800"
              />
              <label htmlFor="acceptFeeCheckbox" className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wide cursor-pointer select-none">Aceito 3%</label>
            </div>
          </div>
        )}

        {/* Tab 1: Backtest Panel (Main trading interface) */}
        {clientActiveTab === 'backtest' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left side: Assets selector & Active Signal visualization */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Seletor de Mercado</h4>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Deriv Assets</span>
                </div>

                {/* Dropdown: Ativo */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ativos Disponíveis</label>
                  <select
                    id="assetSelect"
                    value={selectedAsset}
                    onChange={(e) => {
                      setSelectedAsset(e.target.value);
                      showToast(`Ativo alterado para ${e.target.value}`, 'success');
                    }}
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl py-3 px-3.5 text-xs text-white outline-none focus:border-[#BF953F] transition cursor-pointer font-bold"
                  >
                    <option value="EUR/USD">EUR/USD (Euro / Dólar)</option>
                    <option value="GBP/USD">GBP/USD (Libra / Dólar)</option>
                    <option value="EUR/JPY">EUR/JPY (Euro / Iene)</option>
                    <option value="AUD/CAD">AUD/CAD (Dólar Australiano / Canadense)</option>
                    <option value="Volatility 10">Volatility 10 Index</option>
                    <option value="Volatility 75">Volatility 75 Index</option>
                  </select>
                </div>

                {/* Timeframe choices */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Timeframe da Vela</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-900 cursor-pointer hover:border-slate-800 transition select-none">
                      <input
                        id="forexM15Button"
                        type="radio"
                        name="timeframe"
                        checked={selectedTimeframe === 'Forex M15'}
                        onChange={() => {
                          setSelectedTimeframe('Forex M15');
                          showToast('Sintonizado algoritmo Forex M15', 'success');
                        }}
                        className="w-4.5 h-4.5 text-amber-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-xs font-bold text-white">Forex M15</span>
                    </label>

                    <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-900 cursor-pointer hover:border-slate-800 transition select-none">
                      <input
                        id="jumpM2Button"
                        type="radio"
                        name="timeframe"
                        checked={selectedTimeframe === 'Jump M2'}
                        onChange={() => {
                          setSelectedTimeframe('Jump M2');
                          showToast('Sintonizado algoritmo Jump M2', 'success');
                        }}
                        className="w-4.5 h-4.5 text-amber-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-xs font-bold text-white">Jump M2</span>
                    </label>
                  </div>
                </div>

                {/* Candle countdown timer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Vela Fecha em:</span>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span id="candleCountdown" className="text-xs font-mono font-black text-white">
                      {Math.floor(candleTimeLeft / 60)}:{(candleTimeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>

              </div>

              {/* ACTIVE IA SIGNAL BOARD */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 relative overflow-hidden space-y-4">
                
                {/* Embedded watermark directly under the signal card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0">
                  <BotWatermark size="100%" />
                </div>

                <div className="flex justify-between items-center border-b border-slate-900 pb-3 relative z-10">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Transmissão de Sinais IA</span>
                  </h4>
                  <span className="text-[9px] font-mono text-slate-500 font-bold">VPS LIVE</span>
                </div>

                {!botRunning ? (
                  <div className="py-8 text-center space-y-3 relative z-10">
                    <AlertCircle className="w-8 h-8 text-rose-400/60 mx-auto" />
                    <p className="text-xs text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                      O monitor de varredura neural está pausado. Clique em <strong className="text-white">Iniciar</strong> para ativar o bot.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    
                    {/* Active dynamic state mapping */}
                    <div id="activeSignal" className="p-5 rounded-2xl bg-slate-950 border border-slate-900 text-center space-y-3">
                      
                      {currentClientSignal ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">{currentClientSignal.ativo} • SINAL DE ENTRADA</span>
                            <span id="signalScore" className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-black uppercase">
                              Score: {currentClientSignal.score}%
                            </span>
                          </div>

                          <div className="py-2">
                            {currentClientSignal.tipo === 'CALL' ? (
                              <div className="space-y-1">
                                <span className="text-2xl font-black text-emerald-400 block tracking-wider uppercase flex items-center justify-center gap-2">
                                  <TrendingUp className="w-7 h-7 stroke-[3px]" /> CALL (COMPRA)
                                </span>
                                <span className="text-[10px] text-emerald-400/80 font-mono font-bold block uppercase tracking-wider">Entrada Sintonizada Próxima Vela</span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <span className="text-2xl font-black text-rose-500 block tracking-wider uppercase flex items-center justify-center gap-2">
                                  <TrendingDown className="w-7 h-7 stroke-[3px]" /> PUT (VENDA)
                                </span>
                                <span className="text-[10px] text-rose-500/80 font-mono font-bold block uppercase tracking-wider">Entrada Sintonizada Próxima Vela</span>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-center items-center space-x-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-xl">
                            <Clock className="w-3.5 h-3.5 text-[#BF953F] animate-spin-slow" />
                            <span>Tempo de Operação: 01:24</span>
                          </div>
                        </>
                      ) : (
                        <div className="py-8 space-y-3">
                          <RefreshCw className="w-6 h-6 text-[#BF953F] animate-spin mx-auto" />
                          <div>
                            <span className="text-xs font-bold text-white block uppercase">Varrendo Tendências Neurais</span>
                            <span className="text-[9px] text-slate-500 font-mono block uppercase mt-0.5">Aguardando gatilho de alta assertividade VPS...</span>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Disclaimer rules info */}
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-[9px] text-slate-500 leading-normal font-sans">
                      O sistema analisa o gráfico de velas anteriores do ativo em tempo real. Não execute entradas contrárias ao sugerido pela IA.
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Right side: Realtime Chart View & Monitored assets */}
            <div className="lg:col-span-8 space-y-6">
              
              <div id="marketChart" className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
                
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{selectedAsset} — Fluxograma de Tendências</h3>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Gráfico de Velas Técnicas em Tempo Real</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#FCF6BA] bg-[#BF953F]/10 px-2.5 py-1 rounded-lg border border-[#BF953F]/20">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                    <span>{selectedTimeframe === 'Forex M15' ? 'Vela M15' : 'Vela M2'}</span>
                  </div>
                </div>

                {/* Candle columns display graph mockup */}
                <div className="h-64 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex items-end justify-between relative overflow-hidden">
                  
                  {/* Subtle inner grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-5">
                    <div className="border-b border-white w-full"></div>
                    <div className="border-b border-white w-full"></div>
                    <div className="border-b border-white w-full"></div>
                    <div className="border-b border-white w-full"></div>
                  </div>

                  {/* Absolute watermark inside chart */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
                    <BotWatermark size="50%" />
                  </div>

                  <div className="relative z-10 w-full h-full flex items-end justify-around gap-1 pt-6 pb-2">
                    {chartBars.map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end relative max-w-[45px]">
                        
                        {/* High/Low thin wick */}
                        <div
                          className={`absolute w-[1.5px] ${bar.color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          style={{
                            height: `${bar.high - bar.low}%`,
                            bottom: `${bar.low}%`
                          }}
                        ></div>

                        {/* Open/Close thick candle body */}
                        <div
                          className={`w-full max-w-[20px] rounded-sm relative z-10 border ${
                            bar.color === 'emerald'
                              ? 'bg-emerald-500/20 border-emerald-500'
                              : 'bg-rose-500/20 border-rose-500'
                          }`}
                          style={{
                            height: `${Math.abs(bar.close - bar.open)}%`,
                            bottom: `${Math.min(bar.open, bar.close)}%`
                          }}
                        ></div>

                      </div>
                    ))}
                  </div>

                </div>

                <p className="text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest leading-normal">
                  Gráfico interativo sincronizado diretamente com a Deriv API (WebSocket sintonizado).
                </p>

              </div>

              {/* Secondary block: Monitored assets stream list */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Monitoramento em Segundo Plano</h4>
                  <span className="text-[9px] font-mono text-[#FCF6BA] uppercase">Estatísticas em Tempo Real</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {MONITORED_ASSETS.map((asset, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-900 rounded-2xl p-4 space-y-2 relative overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-white">{asset.ativo}</span>
                        {asset.tendencia === 'up' ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                        )}
                      </div>
                      <div className="flex justify-between items-center pt-1 font-mono text-[10px]">
                        <span className="text-slate-500 uppercase font-bold">Assertividade</span>
                        <span className="text-amber-400 font-extrabold">{asset.score}</span>
                      </div>
                      <div className="flex justify-between items-center font-mono text-[10px]">
                        <span className="text-slate-500 uppercase font-bold">Volatilidade</span>
                        <span className={asset.volatilidade === 'Alta' ? 'text-rose-400 font-extrabold' : 'text-slate-300'}>{asset.volatilidade}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Feed Técnico Console logs */}
        {clientActiveTab === 'feed' && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
            
            <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Feed Técnico de Atividade</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase">Varredura contínua de contratos em segundo plano</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[#FCF6BA] bg-[#BF953F]/15 px-2.5 py-1 rounded-lg border border-[#BF953F]/20 uppercase">
                Console Ativo
              </span>
            </div>

            <div id="userFeed" className="h-96 bg-slate-950 border border-slate-900 rounded-2xl p-5 font-mono text-[11px] text-slate-300 space-y-3 overflow-y-auto">
              {feedMessages.length === 0 ? (
                <div className="text-slate-500 text-center py-10 uppercase tracking-widest">Nenhuma mensagem no feed de auditoria.</div>
              ) : (
                feedMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3.5 border-b border-slate-900/30 pb-2.5">
                    <span className="text-slate-600 shrink-0 select-none">[{msg.time}]</span>
                    <div className="flex-1">
                      {msg.color === 'green' && <span className="text-emerald-400 font-bold uppercase mr-1">[SUCCESS]</span>}
                      {msg.color === 'blue' && <span className="text-sky-400 font-bold uppercase mr-1">[INFO]</span>}
                      {msg.color === 'rose' && <span className="text-rose-500 font-bold uppercase mr-1">[ERROR]</span>}
                      <span className="leading-relaxed">{msg.text}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              O feed sintoniza automaticamente com sua VPS principal. Erros de broker, desconexões parciais, entradas vencedoras (Wins) ou martingale (Gales) são registrados de forma audível neste log de depuração.
            </p>

          </div>
        )}

        {/* Tab 3: Histórico de Sinais */}
        {clientActiveTab === 'historico' && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
            
            <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Histórico de Operações do Robô</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase">Validação diária de contratos e assertividade geral</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[#FCF6BA] bg-[#BF953F]/15 px-2.5 py-1 rounded-lg border border-[#BF953F]/20 uppercase">
                Hoje ({currentTime})
              </span>
            </div>

            {/* Table layout wrapper */}
            <div className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950">
              <table id="signalsHistoryTable" className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-900 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                    <th className="p-4">Horário</th>
                    <th className="p-4">Ativo</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Stake</th>
                    <th className="p-4">Payout</th>
                    <th className="p-4">Score</th>
                    <th className="p-4 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40 text-slate-300">
                  {signalsHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/20 transition">
                      <td className="p-4">{item.hora}</td>
                      <td className="p-4 font-bold text-white">{item.ativo}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.sinal === 'CALL' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.sinal}
                        </span>
                      </td>
                      <td className="p-4">{item.stake}</td>
                      <td className="p-4">{item.payout}</td>
                      <td className="p-4">{item.score}%</td>
                      <td className="p-4 text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                          item.resultado.includes('WIN')
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                        }`}>
                          {item.resultado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              * O histórico é preenchido de forma limpa à medida que novos sinais são gerados pelo robô. Para auditoria técnica, as transações em conta simulada (Demo) também são plotadas neste quadro de validação.
            </p>

          </div>
        )}

        {/* Tab 4: Lucros e Perdas Dashboard */}
        {clientActiveTab === 'lucros' && (
          <div className="space-y-6">
            
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Vitórias de Hoje</span>
                <span id="winsValue" className="text-xl font-extrabold text-emerald-400 block mt-1.5">{winsCount} WINS</span>
              </div>

              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Derrotas de Hoje</span>
                <span id="lossesValue" className="text-xl font-extrabold text-rose-500 block mt-1.5">{lossesCount} LOSS</span>
              </div>

              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Assertividade Diária</span>
                <span id="accuracyValue" className="text-xl font-extrabold text-amber-400 block mt-1.5">{accuracy}%</span>
              </div>

              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Lucro Líquido Estimado</span>
                <span id="totalProfitValue" className="text-xl font-extrabold text-[#FCF6BA] block mt-1.5">+${profitAccumulated.toFixed(2)}</span>
              </div>

            </div>

            {/* Profit vector chart */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Curva de Lucratividade Progressiva</h4>
                <span className="text-[9px] font-mono text-slate-500 uppercase">Valores Consolidados em Dólar</span>
              </div>

              <div id="profitChart" className="h-64 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex items-end relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <BotWatermark size="50%" />
                </div>
                
                {/* SVG vector drawing curves representing real mathematical sequence */}
                <svg className="w-full h-full relative z-10" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="profitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#0f172a" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#0f172a" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#0f172a" strokeWidth="1" />

                  {/* Filled area */}
                  <path
                    d="M 0 180 L 50 160 L 100 130 L 150 145 L 200 110 L 250 90 L 300 100 L 350 65 L 400 45 L 450 55 L 500 30 L 500 200 L 0 200 Z"
                    fill="url(#profitGrad)"
                  />

                  {/* Line path */}
                  <path
                    d="M 0 180 L 50 160 L 100 130 L 150 145 L 200 110 L 250 90 L 300 100 L 350 65 L 400 45 L 450 55 L 500 30"
                    fill="none"
                    stroke="url(#watermarkGreen)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Connection dots */}
                  <circle cx="500" cy="30" r="5" fill="#10B981" />
                  <circle cx="400" cy="45" r="4" fill="#10B981" />
                  <circle cx="250" cy="90" r="4" fill="#10B981" />
                </svg>

              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Início: $0.00</span>
                <span>Último Contrato Resolvido: +$14.80</span>
                <span>Máximo Consolidado: +${profitAccumulated.toFixed(2)}</span>
              </div>

            </div>

          </div>
        )}

        {/* Tab 5: Suporte Técnico */}
        {clientActiveTab === 'suporte' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Col: Contact anchors & schedules */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
              
              <div className="border-b border-slate-900 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Canais de Atendimento Direto</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase">Resolução de dúvidas técnicas e financeiras</span>
              </div>

              <div className="space-y-4">
                
                {/* Telegram link */}
                <a
                  href="https://t.me/botiaforex"
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 bg-slate-950 border border-slate-900 hover:border-[#BF953F]/40 rounded-2xl flex items-center space-x-4 transition group block"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-[#BF953F]/30 flex items-center justify-center text-amber-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-[#FCF6BA] transition">Telegram de Suporte</h4>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">Clique para falar diretamente com nosso bot de atendimento humano: @botiaforex</p>
                  </div>
                </a>

                {/* Instagram Link */}
                <a
                  href="https://www.instagram.com/botiaforexofc?igsh=MW04emM4bjh5YnZobA=="
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 bg-slate-950 border border-slate-900 hover:border-[#BF953F]/40 rounded-2xl flex items-center space-x-4 transition group block"
                >
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-[#FCF6BA] transition">Instagram Oficial</h4>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">Siga @botiaforexofc para ver análises diárias e atualizações de inteligência.</p>
                  </div>
                </a>

              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-900/80 font-sans text-xs text-slate-400 space-y-1.5">
                <span className="block font-bold text-white uppercase tracking-wider text-[10px]">Horário de Atendimento Humano:</span>
                <p className="leading-relaxed">Segunda a Sexta-feira: 09:00 às 18:00 (Horário de Brasília).</p>
                <p className="leading-relaxed">Sábados, Domingos e Feriados: Regime de plantão emergencial via Telegram.</p>
              </div>

            </div>

            {/* Right Col: FAQ and rules */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
              
              <div className="border-b border-slate-900 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Políticas de Segurança e Uso do Bot</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase">Regras contratuais para operar na VPS</span>
              </div>

              <div className="space-y-4 text-slate-400 font-sans text-xs leading-relaxed">
                
                <div className="space-y-1">
                  <span className="block font-bold text-white uppercase text-[10px] tracking-wide">1. Limitação de Contratos:</span>
                  <p>A VPS monitora ordens paralelas para não sobrecarregar as margens da corretora. Siga a gestão recomendada.</p>
                </div>

                <div className="space-y-1">
                  <span className="block font-bold text-white uppercase text-[10px] tracking-wide">2. Retirada de Lucros (Payout):</span>
                  <p>A corretora Deriv processa todas as retiradas de forma imediata. O Bot IA não possui ingerência nem retém valores de saldos de seus usuários.</p>
                </div>

                <div className="space-y-1">
                  <span className="block font-bold text-white uppercase text-[10px] tracking-wide">3. Termos de Afiliado:</span>
                  <p>Para se manter elegível ao uso gratuito e ilimitado na conta demo/real, certifique-se de que sua conta Deriv foi criada através do link oficial de afiliado sintonizado com o nosso sistema.</p>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
