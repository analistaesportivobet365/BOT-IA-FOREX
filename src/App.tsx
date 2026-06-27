import React, { useState, useEffect, useRef } from 'react';
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

import BotWatermark from './components/BotWatermark';

// Live telemetry assets matching the premium theme
const INITIAL_HISTORICO: any[] = [];

const MONITORED_ASSETS = [
  { ativo: 'EUR/USD', tendencia: 'up', score: '94%', volatilidade: 'Baixa' },
  { ativo: 'GBP/USD', tendencia: 'up', score: '88%', volatilidade: 'Média' },
  { ativo: 'EUR/JPY', tendencia: 'down', score: '82%', volatilidade: 'Baixa' },
  { ativo: 'AUD/CAD', tendencia: 'down', score: '71%', volatilidade: 'Alta' }
];

export default function App() {
  // Screen Routing
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'loading' | 'panel'>('landing');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accessMode, setAccessMode] = useState<'client' | 'admin'>('client');

  // Loading Screen States (10 seconds)
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatusText, setLoadingStatusText] = useState('Iniciando conexão segura...');

  // Client Dashboard Active Tab
  const [clientActiveTab, setClientActiveTab] = useState<'backtest' | 'feed' | 'historico' | 'lucros' | 'suporte'>('backtest');
  
  // Admin Navigation Active Tab
  const [adminActiveTab, setAdminActiveTab] = useState<'vps_api' | 'configuracoes' | 'painel_geral'>('vps_api');

  // Operational State
  const [botRunning, setBotRunning] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<'demo' | 'real'>('demo');
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Forex M15' | 'Jump M2'>('Forex M15');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);

  // Stats / Balances
  const [balanceDemo, setBalanceDemo] = useState(0.00);
  const [balanceReal, setBalanceReal] = useState(0.00);
  const [winsCount, setWinsCount] = useState(0);
  const [lossesCount, setLossesCount] = useState(0);
  const [profitAccumulated, setProfitAccumulated] = useState(0.00);
  const [operationsToday, setOperationsToday] = useState(0);

  // Admin simulation states
  const [adminWinsInput, setAdminWinsInput] = useState(0);
  const [adminLossesInput, setAdminLossesInput] = useState(0);
  const [adminPayoutInput, setAdminPayoutInput] = useState(0);
  const [adminScoreInput, setAdminScoreInput] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [adminLogsList, setAdminLogsList] = useState<string[]>([]);

  // Time tickers
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  const [currentDate, setCurrentDate] = useState('15/05/2025');

  // Feed Messages
  const [feedMessages, setFeedMessages] = useState<any[]>([]);

  // Signal History state
  const [signalsHistory, setSignalsHistory] = useState<any[]>(INITIAL_HISTORICO);

  // Live Chart mock values (candlesticks representing price bars)
  const [chartBars, setChartBars] = useState<any[]>([
    { open: 80, high: 95, low: 75, close: 90, color: 'emerald' },
    { open: 90, high: 110, low: 85, close: 105, color: 'emerald' },
    { open: 105, high: 115, low: 90, close: 95, color: 'rose' },
    { open: 95, high: 100, low: 70, close: 82, color: 'rose' },
    { open: 82, high: 105, low: 80, close: 100, color: 'emerald' },
    { open: 100, high: 120, low: 95, close: 115, color: 'emerald' },
    { open: 115, high: 125, low: 105, close: 110, color: 'rose' },
    { open: 110, high: 130, low: 108, close: 125, color: 'emerald' }
  ]);

  // Live signal countdown state
  const [currentClientSignal, setCurrentClientSignal] = useState<{
    ativo: string;
    tipo: 'CALL' | 'PUT';
    score: number;
    timer: number;
    status: 'analisando' | 'sinal' | 'aguardando';
  }>({ ativo: 'EUR/USD', tipo: 'CALL', score: 87, timer: 10, status: 'aguardando' });

  // Candle countdown timer state
  const [candleTimeLeft, setCandleTimeLeft] = useState('00:00');

  // Interactive manual trade processing states
  const [isTradeProcessing, setIsTradeProcessing] = useState(false);
  const [processingTradeDirection, setProcessingTradeDirection] = useState<'CALL' | 'PUT' | null>(null);
  const [processingTradeTimeLeft, setProcessingTradeTimeLeft] = useState(0);

  // Toast Alerts system
  const [toasts, setToasts] = useState<any[]>([]);
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Clock Ticker Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Candle Countdown Ticker Effect based on selectedTimeframe
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      let secondsRemaining = 0;
      if (selectedTimeframe === 'Forex M15') {
        const minutesPassedInCycle = minutes % 15;
        const totalSecondsPassed = (minutesPassedInCycle * 60) + seconds;
        secondsRemaining = (15 * 60) - totalSecondsPassed;
      } else { // 'Jump M2'
        const minutesPassedInCycle = minutes % 2;
        const totalSecondsPassed = (minutesPassedInCycle * 60) + seconds;
        secondsRemaining = (2 * 60) - totalSecondsPassed;
      }
      
      const m = Math.floor(secondsRemaining / 60);
      const s = secondsRemaining % 60;
      setCandleTimeLeft(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    
    updateTimer();
    const t = setInterval(updateTimer, 1000);
    return () => clearInterval(t);
  }, [selectedTimeframe]);

  // Bot Signal Simulator Effect
  useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => {
      setCurrentClientSignal(prev => {
        if (!botRunning) {
          return { ...prev, status: 'aguardando', timer: 0 };
        }
        
        if (prev.timer <= 1) {
          // Switch states
          if (prev.status === 'aguardando' || prev.status === 'analisando') {
            const nextType = Math.random() > 0.5 ? 'CALL' : 'PUT';
            const assets = ['EUR/USD', 'GBP/USD', 'EUR/JPY', 'AUD/CAD'];
            const nextAsset = assets[Math.floor(Math.random() * assets.length)];
            const nextScore = Math.floor(78 + Math.random() * 18);
            const time = new Date().toLocaleTimeString('pt-BR');
            
            if (accessMode === 'admin') {
              // Add feed message for Admin
              setFeedMessages(prevFeed => [
                { id: Date.now() + 1, type: nextType === 'CALL' ? 'signal_call' : 'signal_put', text: `SINAL AUTOMÁTICO (ADMIN): ${nextType} em ${nextAsset} (Score: ${nextScore}%)`, time, color: nextType === 'CALL' ? 'green' : 'red' },
                ...prevFeed.slice(0, 8)
              ]);

              // Simulate result 5s later for Admin ONLY (automatic)
              setTimeout(() => {
                const isWin = Math.random() > 0.3; // 70% winrate
                const resultTime = new Date().toLocaleTimeString('pt-BR');
                
                setFeedMessages(prevFeed => [
                  { id: Date.now() + 2, type: isWin ? 'win' : 'loss', text: isWin ? `CONTRATO VITORIOSO (AUTO): +$8.50` : `CONTRATO LIQUIDADO (AUTO): -$10.00`, time: resultTime, color: isWin ? 'green' : 'red' },
                  ...prevFeed.slice(0, 8)
                ]);

                // Update stats
                if (isWin) {
                  setWinsCount(w => w + 1);
                  setProfitAccumulated(p => p + 8.50);
                  if (selectedMarket === 'demo') {
                    setBalanceDemo(b => b + 8.50);
                  } else {
                    setBalanceReal(b => b + 8.50);
                  }
                } else {
                  setLossesCount(l => l + 1);
                  setProfitAccumulated(p => p - 10.00);
                  if (selectedMarket === 'demo') {
                    setBalanceDemo(b => b - 10.00);
                  } else {
                    setBalanceReal(b => b - 10.00);
                  }
                }
                setOperationsToday(o => o + 1);

                // Update history table
                setSignalsHistory(prevHist => [
                  {
                    id: Date.now(),
                    hora: resultTime,
                    ativo: nextAsset,
                    sinal: nextType,
                    resultado: isWin ? 'WIN' : 'LOSS',
                    stake: '$10.00',
                    payout: isWin ? '85%' : '0%',
                    score: nextScore,
                    gale: 0
                  },
                  ...prevHist.slice(0, 6)
                ]);

              }, 5000);
            } else {
              // Client Mode: Only identify and log the signal (user must choose to execute)
              setFeedMessages(prevFeed => [
                { id: Date.now() + 1, type: nextType === 'CALL' ? 'signal_call' : 'signal_put', text: `SINAL IDENTIFICADO: ${nextType} em ${nextAsset} (Score: ${nextScore}%) - OPERAÇÃO MANUAL RECOMENDADA`, time, color: 'blue' },
                ...prevFeed.slice(0, 8)
              ]);
              showToast(`IA identificou sinal de ${nextType} em ${nextAsset}!`, 'success');
            }

            return {
              ativo: nextAsset,
              tipo: nextType,
              score: nextScore,
              timer: 15, // Active for 15s
              status: 'sinal'
            };
          } else {
            return {
              ...prev,
              timer: 8, // Analyse for 8s
              status: 'analisando'
            };
          }
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [botRunning, selectedMarket, accessMode]);

  // Live Chart fluctuation simulation
  useEffect(() => {
    const candleInterval = setInterval(() => {
      setChartBars(prev => {
        const next = [...prev];
        const lastIdx = next.length - 1;
        const lastCandle = { ...next[lastIdx] };
        
        // Random drift
        const delta = Math.floor((Math.random() - 0.5) * 8);
        lastCandle.close = Math.max(20, Math.min(180, lastCandle.close + delta));
        lastCandle.color = lastCandle.close >= lastCandle.open ? 'emerald' : 'rose';
        next[lastIdx] = lastCandle;

        // Push new candle periodically
        if (Math.random() > 0.75) {
          next.shift();
          const open = lastCandle.close;
          const close = open + Math.floor((Math.random() - 0.5) * 20);
          const low = Math.min(open, close) - Math.floor(Math.random() * 10);
          const high = Math.max(open, close) + Math.floor(Math.random() * 10);
          next.push({
            open,
            high: Math.max(high, open, close),
            low: Math.min(low, open, close),
            close,
            color: close >= open ? 'emerald' : 'rose'
          });
        }
        return next;
      });
    }, 1500);

    return () => clearInterval(candleInterval);
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    const isAdm = loginEmail.toLowerCase() === 'admin@botiaforex.com' && loginPassword === 'admin';
    setAccessMode(isAdm ? 'admin' : 'client');
    
    // Set to loading screen
    setCurrentScreen('loading');
    setLoadingProgress(0);
    setLoadingStatusText('Conectando ao servidor VPS seguro...');

    // 10 seconds total: 100 increments of 100ms
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);

      // Dynamically update status text based on progress milestone
      if (progress < 15) {
        setLoadingStatusText('Efetuando handshake seguro com a VPS Bot IA Forex...');
      } else if (progress < 30) {
        setLoadingStatusText('Autenticando chaves RSA de segurança com a API da corretora...');
      } else if (progress < 45) {
        setLoadingStatusText('Carregando algoritmos preditivos de Inteligência Artificial...');
      } else if (progress < 60) {
        setLoadingStatusText('Sincronizando bancos de dados e backtests históricos...');
      } else if (progress < 75) {
        setLoadingStatusText('Inicializando varredura de sinais em tempo real...');
      } else if (progress < 90) {
        setLoadingStatusText('Calibrando score de precisão da rede neural...');
      } else {
        setLoadingStatusText('Carregando interface do painel operacional...');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setCurrentScreen('panel');
        if (isAdm) {
          showToast('Acesso administrativo concedido com sucesso!', 'success');
        } else {
          showToast('Login de usuário deriv efetuado com sucesso!', 'success');
        }
      }
    }, 100);
  };

  // Live manual trades trigger
  const handleManualTrade = (direction: 'CALL' | 'PUT') => {
    if (selectedMarket === 'real' && !consentChecked) {
      showToast('Atenção: É necessário autorizar e aceitar o consentimento dos termos de 3% para operar em conta real.', 'error');
      return;
    }

    if (isTradeProcessing) {
      showToast('Já existe uma operação manual em andamento. Aguarde a conclusão!', 'error');
      return;
    }

    // Check balance
    const currentBalance = selectedMarket === 'demo' ? balanceDemo : balanceReal;
    if (currentBalance < 10.00) {
      showToast('Saldo insuficiente para realizar uma operação de $10.00.', 'error');
      return;
    }

    // Deduct entry stake ($10.00)
    if (selectedMarket === 'demo') {
      setBalanceDemo(b => b - 10.00);
    } else {
      setBalanceReal(b => b - 10.00);
    }

    setIsTradeProcessing(true);
    setProcessingTradeDirection(direction);
    setProcessingTradeTimeLeft(5);

    showToast(`Ordem manual de ${direction} enviada com sucesso ao VPS! $10.00 reservados.`);
    
    // Simulate manual trade logs
    const time = new Date().toLocaleTimeString('pt-BR');
    setFeedMessages(prev => [
      { id: Date.now(), type: 'status', text: `[ORDEM MANUAL] Iniciada operação de ${direction} em ${selectedAsset} ($10.00)`, time, color: 'blue' },
      ...prev
    ]);

    // Live countdown timer interval
    let countdownLeft = 5;
    const countInterval = setInterval(() => {
      countdownLeft -= 1;
      setProcessingTradeTimeLeft(countdownLeft);
      if (countdownLeft <= 0) {
        clearInterval(countInterval);
      }
    }, 1000);

    // Simulate result 5s later
    setTimeout(() => {
      setIsTradeProcessing(false);
      setProcessingTradeDirection(null);

      // Check winrate: If there is an active signal from AI and user followed it, win chance is 85%. Otherwise 50%.
      const hasActiveSignal = currentClientSignal.status === 'sinal' && currentClientSignal.ativo === selectedAsset;
      const followedAISignal = hasActiveSignal && currentClientSignal.tipo === direction;
      const winChance = followedAISignal ? 0.85 : 0.50;
      
      const isWin = Math.random() < winChance;
      const resultTime = new Date().toLocaleTimeString('pt-BR');

      // Update stats and balance
      if (isWin) {
        setWinsCount(w => w + 1);
        setProfitAccumulated(p => p + 8.50);
        if (selectedMarket === 'demo') {
          setBalanceDemo(b => b + 18.50); // Refund $10.00 + $8.50 profit
        } else {
          setBalanceReal(b => b + 18.50);
        }
        showToast(`SUCESSO! Operação manual de ${direction} em ${selectedAsset} finalizada em WIN! +$8.50`, 'success');
        
        setFeedMessages(prev => [
          { id: Date.now() + 1, type: 'win', text: `[MANUAL WIN] ${direction} em ${selectedAsset} finalizado com lucro! +$8.50`, time: resultTime, color: 'green' },
          ...prev
        ]);
      } else {
        setLossesCount(l => l + 1);
        setProfitAccumulated(p => p - 10.00);
        // Note: Stake $10.00 was already deducted, so no further deduction from balance is needed on loss
        showToast(`LOSS! Operação manual de ${direction} em ${selectedAsset} fechou negativa. -$10.00`, 'error');

        setFeedMessages(prev => [
          { id: Date.now() + 1, type: 'loss', text: `[MANUAL LOSS] ${direction} em ${selectedAsset} liquidado sem retorno. -$10.00`, time: resultTime, color: 'red' },
          ...prev
        ]);
      }
      setOperationsToday(o => o + 1);

      // Add to signal history table
      setSignalsHistory(prevHist => [
        {
          id: Date.now(),
          hora: resultTime,
          ativo: selectedAsset,
          sinal: direction,
          resultado: isWin ? 'WIN' : 'LOSS',
          stake: '$10.00',
          payout: isWin ? '85%' : '0%',
          score: followedAISignal ? currentClientSignal.score : 50,
          gale: 0
        },
        ...prevHist.slice(0, 6)
      ]);

    }, 5000);
  };

  // Exporter of local stand-alone package (.ZIP)
  const handleExportZip = async () => {
    try {
      showToast('Iniciando compilação do pacote autônomo VPS (.ZIP)...', 'success');
      const JSZip = (window as any).JSZip;
      if (!JSZip) {
        showToast('Biblioteca JSZip não está disponível. Aguarde ou recarregue.', 'error');
        return;
      }

      const zip = new JSZip();
      
      // Let's load fallback raw texts of index_standalone and custom app.js to create a complete static page
      const htmlText = await fetch('/index_standalone.html').then(r => r.text()).catch(() => '<!-- Standalone Panel fallback -->');
      const stylesText = await fetch('/styles.css').then(r => r.text()).catch(() => '/* Custom styles fallbacks */');
      const appJsText = await fetch('/app.js').then(r => r.text()).catch(() => '/* App logic fallbacks */');
      const manualText = await fetch('/manual_botoes.md').then(r => r.text()).catch(() => '# Manual de botões do VPS');

      zip.file("index.html", htmlText);
      zip.file("styles.css", stylesText);
      zip.file("app.js", appJsText);
      zip.file("manual_botoes.md", manualText);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'painel_deriv_bot_ia_forex.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast('Pacote (.ZIP) exportado com sucesso! Pronto para carregar no seu VPS.', 'success');
    } catch (err: any) {
      showToast(`Erro ao gerar ZIP de implantação: ${err.message}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Toast alert system widget */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl border shadow-2xl transition duration-300 animate-slide-in pointer-events-auto ${
              t.type === 'success'
                ? 'bg-slate-900/95 border-[#BF953F]/40 text-amber-400'
                : 'bg-slate-900/95 border-rose-500/40 text-rose-400'
            }`}
          >
            {t.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            <span className="text-xs font-bold uppercase tracking-wide">{t.text}</span>
          </div>
        ))}
      </div>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-slate-950/0 to-slate-950 pointer-events-none z-0"></div>

      {/* ========================================================
          SCREEN 1: LANDING PRESENTATION WEBSITE
         ======================================================== */}
      {currentScreen === 'landing' && (
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* Background watermark for the entire Landing screen */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[750px] md:h-[750px] lg:w-[900px] lg:h-[900px] opacity-[0.05] sm:opacity-[0.07] shrink-0 animate-pulse-slow">
              <BotWatermark size="100%" />
            </div>
          </div>
          
          {/* Landing Header */}
          <header className="w-full border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* Brand Logo Header */}
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 border border-[#BF953F]/40 text-amber-400 shadow-md">
                  <Activity className="w-5 h-5 animate-pulse" />
                  <div className="absolute inset-0 rounded-xl bg-amber-500/10 blur-sm"></div>
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-wider text-white uppercase font-sans">Bot IA Forex</h2>
                  <span className="text-[9px] font-mono tracking-widest text-[#FCF6BA] block uppercase">Intelligence Core</span>
                </div>
              </div>

              {/* Header Navigation Link anchors */}
              <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-400">
                <a href="#como-funciona" className="hover:text-white transition">Como Funciona</a>
                <a href="#taxas" className="hover:text-white transition">Taxas e Regras</a>
                <a href="#faq" className="hover:text-white transition">Perguntas Frequentes</a>
                <a id="telegramButton" href="https://t.me/botiaforex" target="_blank" rel="noreferrer" className="hover:text-[#FCF6BA] transition flex items-center gap-1.5 text-amber-400">
                  <MessageCircle className="w-4 h-4" /> Telegram
                </a>
              </div>

              {/* Action trigger button */}
              <button
                id="accessPanelButton"
                onClick={() => setCurrentScreen('login')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#BF953F] to-[#B38728] hover:opacity-90 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer border-none transition"
              >
                Acessar Painel
              </button>

            </div>
          </header>

          {/* Hero segment */}
          <main className="flex-1">
            
            <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              
              {/* Left Column: Copious details & branding */}
              <div className="lg:col-span-7 space-y-8 relative z-10">
                
                {/* Premium Gold Tag badge */}
                <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/30 text-[#FCF6BA] text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Sinais Automatizados Forex & Índices Sintéticos</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                  O primeiro robô inteligente e{' '}
                  <span className="gold-text-gradient font-black">100% gratuito</span> para testar.
                </h1>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
                  Monitore tendências neurais do mercado de Forex em M15 ou ativos de Jump M2 com alta inteligência analítica. O robô opera com precisão através de chamadas automatizadas e seguras de baixo nível.
                </p>

                {/* Quick informational bullet cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex items-start space-x-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Conta Demo Totalmente Livre</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Opere na conta de demonstração da Deriv de forma totalmente gratuita e ilimitada.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex items-start space-x-3">
                    <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Taxa de 3% Sob Lucro Real</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Cobrança de apenas 3% sob o payout vitorioso somente ao operar em conta real.</p>
                    </div>
                  </div>

                </div>

                {/* Main Landing Action triggers */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  
                  <button
                    id="accessPanelButton"
                    onClick={() => setCurrentScreen('login')}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] hover:opacity-90 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/10 cursor-pointer border-none flex items-center justify-center space-x-2 transition"
                  >
                    <span>Acessar Painel de Controle</span>
                    <ChevronRight className="w-4 h-4 text-slate-900" />
                  </button>

                  <a
                    id="registerDerivButton"
                    href="https://partner-tracking.deriv.com/click?a=26974&o=1&c=3&link_id=1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 active:bg-slate-900 text-[#FCF6BA] font-black text-xs uppercase tracking-widest rounded-2xl border border-[#BF953F]/40 text-center flex items-center justify-center space-x-2 transition"
                  >
                    <span>Registrar na Deriv Oficial</span>
                    <ExternalLink className="w-4 h-4 text-[#BF953F]" />
                  </a>

                </div>

                {/* Disclaimer Warning - Policies do not guarantee profit */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4 flex items-start space-x-3 max-w-2xl">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    <strong className="text-rose-400 uppercase tracking-wider block mb-0.5">Políticas de Análise - Sem Garantia de Lucro:</strong>
                    Toda tomada de decisão baseia-se em probabilidades matemáticas baseadas em padrões passados de Forex. O mercado de câmbio possui riscos inevitáveis de flutuação e perdas parciais. Ganhos anteriores não constituem promessa ou garantia de lucros fixos no presente ou futuro. Opere com consciência.
                  </p>
                </div>

              </div>

              {/* Right Column: Visual Mockup card imitating App layout */}
              <div className="lg:col-span-5 relative flex justify-center">
                
                {/* Glowing ring under the card */}
                <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl -z-10 animate-pulse-slow"></div>

                {/* Smartphone visual frame container mimicking input_image_2.png */}
                <div className="w-full max-w-sm rounded-[32px] border-4 border-slate-900 bg-slate-950 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Subtle watermarked logo background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <BotWatermark className="opacity-[0.06] w-64 h-64" size="100%" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    
                    {/* Top bar header info */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center border border-[#BF953F]/30 text-amber-400 text-[10px] font-bold">D</div>
                        <span className="text-[10px] font-bold text-slate-200">Saldo DEMO</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">$10,000.00</span>
                    </div>

                    {/* Active signal mockup indicator */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Sinal Ativo</span>
                        <span className="text-xs font-black text-amber-400">CALL EUR/USD</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-black uppercase">Score: 92%</span>
                    </div>

                    {/* Chart Mockup spline */}
                    <div className="h-28 bg-slate-950 rounded-xl border border-slate-900 p-2 flex items-end justify-between relative overflow-hidden">
                      <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-600">EUR/USD M15 Live</div>
                      <div className="w-full h-14 flex items-end gap-1 px-1">
                        {[40, 60, 50, 75, 90, 80, 110, 105, 125].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t" style={{ height: `${h / 2}%` }}></div>
                        ))}
                      </div>
                    </div>

                    {/* CALL / PUT buttons simulation */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-500/20 text-emerald-400 py-2.5 rounded-xl text-center text-[10px] font-black border border-emerald-500/30">CALL COMPRA</div>
                      <div className="bg-rose-500/20 text-rose-400 py-2.5 rounded-xl text-center text-[10px] font-black border border-rose-500/30">PUT VENDA</div>
                    </div>

                  </div>

                  <p className="text-[8px] text-slate-500 text-center font-mono uppercase tracking-widest mt-4">Bot IA Forex Premium Dashboard</p>

                </div>

              </div>

            </section>

            {/* Section: Como funciona */}
            <section id="como-funciona" className="border-t border-slate-900 bg-slate-950/60 py-16">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="text-center space-y-3 max-w-2xl mx-auto pb-12">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">Simplicidade e Performance</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">Fluxo Operacional Automatizado</h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-normal font-sans">
                    Veja como o painel técnico valida suas operações na VPS e repassa sinais estruturados do Deriv sem complicações.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Step 1 */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
                    <span className="text-4xl font-extrabold text-amber-400/10 font-mono">01</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Crie sua Conta</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Registre sua conta regulamentada de forma segura na corretora <a href="https://partner-tracking.deriv.com/click?a=26974&o=1&c=3&link_id=1" target="_blank" rel="noreferrer" className="text-amber-400 underline font-semibold">Deriv Oficial</a> para obter o Token de Conexão.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
                    <span className="text-4xl font-extrabold text-amber-400/10 font-mono">02</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Teste na Conta Demo</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Navegue pelo painel de controle e ative o bot de análise. Todas as operações em conta Demo são totalmente gratuitas e ilimitadas para você validar.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-4">
                    <span className="text-4xl font-extrabold text-amber-400/10 font-mono">03</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Ative Conta Real</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Quando se sentir seguro, opere na conta real. A concordância de taxa é de apenas 3% calculada sob o payout de lucro de cada transação vencedora.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* Section: FAQ e Regras */}
            <section id="faq" className="border-t border-slate-900 py-16">
              <div className="max-w-4xl mx-auto px-6">
                
                <div className="text-center space-y-3 pb-12">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest font-mono">Perguntas Obrigatórias e Dúvidas</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">Dúvidas Frequentes</h2>
                </div>

                <div className="space-y-4 font-sans">
                  
                  {/* Q1 */}
                  <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">É obrigatório concordar com a taxa de 3% para usar o bot na conta real?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sim, para usufruir da inteligência artificial e dos sinais altamente assertivos do robô na conta real, é necessário aceitar os termos de consentimento no painel. Esta taxa de 3% incide exclusivamente sobre o payout de lucro de cada operação vitoriosa. Na conta demo, o uso é totalmente livre e sem custos.
                    </p>
                  </div>

                  {/* Q2 */}
                  <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quais mercados o bot analisa atualmente?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      O bot de inteligência possui pesos neurais treinados para analisar os mercados de Forex em timeframe M15 (EUR/USD, GBP/USD, etc.) e os índices de Jump M2 para oscilações rápidas. Você pode alternar entre eles a qualquer momento no painel de operações.
                    </p>
                  </div>

                  {/* Q3 */}
                  <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Como falar com a equipe de suporte?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Oferecemos suporte técnico completo via Telegram no endereço <a href="https://t.me/botiaforex" target="_blank" rel="noreferrer" className="text-[#FCF6BA] underline font-bold">@botiaforex</a> e postamos análises, atualizações e estratégias adicionais no Instagram oficial <a href="https://www.instagram.com/botiaforexofc?igsh=MW04emM4bjh5YnZobA==" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">@botiaforexofc</a>.
                    </p>
                  </div>

                </div>

              </div>
            </section>

          </main>

          {/* Landing Footer */}
          <footer className="w-full border-t border-slate-900 bg-slate-950 py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-[#BF953F]/40 flex items-center justify-center text-amber-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Bot IA Forex © 2025</span>
              </div>

              <div className="flex items-center space-x-6 text-xs text-slate-500">
                <a href="https://t.me/botiaforex" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">Telegram Support</a>
                <a href="https://www.instagram.com/botiaforexofc?igsh=MW04emM4bjh5YnZobA==" target="_blank" rel="noreferrer" className="hover:text-[#FCF6BA] transition">Instagram Oficial</a>
                <a href="https://partner-tracking.deriv.com/click?a=26974&o=1&c=3&link_id=1" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition font-bold">Cadastrar Deriv</a>
              </div>

            </div>
          </footer>

        </div>
      )}

      {/* ========================================================
          SCREEN 2: LOGIN PAGE (Styled like input_image_0.png)
         ======================================================== */}
      {currentScreen === 'login' && (
        <div className="relative z-10 flex min-h-screen items-center justify-center p-6 bg-slate-950 overflow-hidden">
          
          {/* Background watermark for the login page */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div className="w-[300px] h-[300px] md:w-[650px] md:h-[650px] opacity-[0.05] shrink-0 animate-pulse-slow">
              <BotWatermark size="100%" />
            </div>
          </div>
          
          {/* Green floor grid decor in background */}
          <div className="absolute inset-x-0 bottom-0 h-96 grid-floor opacity-40 pointer-events-none z-0"></div>

          {/* Trend indicators curves visually on sides */}
          <div className="absolute left-10 top-1/3 hidden xl:block text-emerald-500/20 font-bold text-[120px] select-none leading-none z-0">
            <TrendingUp className="w-44 h-44" />
          </div>
          <div className="absolute right-10 bottom-1/3 hidden xl:block text-rose-500/20 font-bold text-[120px] select-none leading-none z-0">
            <TrendingDown className="w-44 h-44" />
          </div>

          {/* Center Card with Gold Borders */}
          <div className="w-full max-w-md bg-slate-950/90 rounded-[28px] border border-[#BF953F]/30 gold-border-glow p-8 space-y-6 relative z-10 overflow-hidden backdrop-blur-xl">
            
            {/* Watermark coin behind the card */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <BotWatermark className="opacity-[0.06] w-72 h-72" size="100%" />
            </div>

            <div className="relative z-10 space-y-2 text-center">
              
              {/* Back to landing link */}
              <button
                id="backToLandingButton"
                onClick={() => setCurrentScreen('landing')}
                className="text-[10px] font-bold text-[#FCF6BA] hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer"
              >
                ← Voltar para apresentação
              </button>

              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-[#BF953F]/40 flex items-center justify-center text-amber-400 shadow-md">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Bot IA Forex</h2>
              </div>

              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mt-2">
                FAÇA SEU REGISTRO AQUI <br />
                <span className="text-amber-400 text-[10px]">ACESSE SUA CONTA DERIV</span>
              </h3>

            </div>

            {/* Email / Pass Form */}
            <form onSubmit={handleLogin} className="relative z-10 space-y-4">
              
              {/* Input: Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Endereço de E-mail</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    id="loginEmail"
                    type="email"
                    required
                    placeholder="exemplo@deriv.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Input: Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sua Senha</label>
                  <a href="#esqueceu" onClick={(e) => { e.preventDefault(); showToast('Fale com o suporte no telegram para redefinição de chaves.'); }} className="text-[10px] text-[#FCF6BA] hover:underline font-bold">Esqueceu a senha?</a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    id="loginPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-xs text-slate-200 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white bg-transparent border-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Status/Message Element */}
              <div id="loginMessage" className="hidden text-[10px] text-rose-400 text-center font-mono"></div>

              {/* Button: Conectar */}
              <button
                id="loginButton"
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-95 active:scale-95 cursor-pointer border-none flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 transition"
              >
                <span>Conectar</span>
                <ChevronRight className="w-4.5 h-4.5 text-slate-950" />
              </button>

            </form>

            <div className="relative z-10 flex items-center justify-center gap-2 text-xs font-mono text-slate-600 uppercase">
              <span className="w-8 h-[1px] bg-slate-900"></span>
              <span>OU</span>
              <span className="w-8 h-[1px] bg-slate-900"></span>
            </div>

            {/* Button: Criar Conta */}
            <a
              id="createDerivAccountButton"
              href="https://partner-tracking.deriv.com/click?a=26974&o=1&c=3&link_id=1"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 w-full block py-3.5 bg-slate-950 hover:bg-slate-900 active:bg-slate-950 text-emerald-400 font-black text-xs uppercase tracking-widest rounded-xl border border-emerald-500/40 text-center flex items-center justify-center space-x-2 transition"
            >
              <span>Criar Conta na Deriv</span>
              <ChevronRight className="w-4.5 h-4.5 text-emerald-400" />
            </a>

            {/* Data Protection badge */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Seus dados estão protegidos. Privacidade é prioridade.</span>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          SCREEN: LOADING TRANSITION (10 Seconds Simulation)
         ======================================================== */}
      {currentScreen === 'loading' && (
        <div className="relative z-10 flex min-h-screen items-center justify-center p-6 bg-slate-950 overflow-hidden">
          
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
      )}

      {/* ========================================================
          SCREEN 3: TRADING CONTROL PANEL (Responsive Dashboard)
         ======================================================== */}
      {currentScreen === 'panel' && (
        <div className="relative z-10 flex h-screen overflow-hidden bg-slate-950">
          
          {/* Background watermark for the entire Panel/Dashboard screen */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] opacity-[0.04] sm:opacity-[0.05] shrink-0 animate-pulse-slow">
              <BotWatermark size="100%" />
            </div>
          </div>
          
          {/* ==========================================
              ADMIN SIDEBAR (Rendered only on Admin view)
             ========================================== */}
          {accessMode === 'admin' && (
            <aside className="w-64 border-r border-slate-900 bg-slate-950 flex flex-col justify-between shrink-0 h-full hidden lg:flex">
              <div className="flex flex-col space-y-6 py-6 px-4">
                
                {/* Logo Brand Header */}
                <div className="flex items-center space-x-3 px-2">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 border border-[#BF953F]/40 text-amber-400 shadow-md">
                    <Activity className="w-6 h-6 animate-pulse" />
                    <div className="absolute inset-0 rounded-xl bg-amber-500/10 blur-sm"></div>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white uppercase tracking-wider">Bot IA Forex</h2>
                    <span className="text-[9px] text-amber-400 font-mono tracking-wider block uppercase">ADMIN PANEL</span>
                  </div>
                </div>

                {/* Navigation Links for Admin */}
                <nav className="space-y-1.5">
                  <button
                    onClick={() => setAdminActiveTab('vps_api')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition uppercase text-left border-none cursor-pointer ${
                      adminActiveTab === 'vps_api' ? 'bg-[#BF953F]/15 text-[#FCF6BA] border border-[#BF953F]/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Database className="w-4 h-4 text-[#BF953F]" />
                    <span>Validador VPS API</span>
                  </button>

                  <button
                    onClick={() => {
                      setAdminActiveTab('painel_geral');
                      showToast('Navegando para painel geral');
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition uppercase text-left border-none cursor-pointer ${
                      adminActiveTab === 'painel_geral' ? 'bg-[#BF953F]/15 text-[#FCF6BA] border border-[#BF953F]/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Painel Geral</span>
                  </button>

                  <button
                    onClick={() => {
                      setAdminActiveTab('configuracoes');
                      showToast('Configurações de rede VPS carregadas.');
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition uppercase text-left border-none cursor-pointer ${
                      adminActiveTab === 'configuracoes' ? 'bg-[#BF953F]/15 text-[#FCF6BA] border border-[#BF953F]/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configuração VPS</span>
                  </button>
                </nav>

              </div>

              {/* VPS Status Footer indicator */}
              <div className="p-4 border-t border-slate-900">
                <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Host VPS</span>
                    <span className="flex items-center text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">api.botiaforex.com.br</span>
                </div>
              </div>
            </aside>
          )}

          {/* ==========================================
              MAIN WINDOW FRAME
             ========================================== */}
          <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            
            {/* Top bar header */}
            <header className="h-20 border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-30">
              
              {/* Back action + Profile logo */}
              <div className="flex items-center space-x-4">
                <button
                  id="logoutButton"
                  onClick={() => {
                    setCurrentScreen('landing');
                    setBotRunning(false);
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer border border-slate-850"
                >
                  ← Sair
                </button>
                <div>
                  <h1 className="text-base font-black text-white uppercase tracking-tight">BOT IA FOREX</h1>
                  <span className="text-[9px] text-[#FCF6BA] font-bold block uppercase tracking-widest">
                    {accessMode === 'admin' ? 'ADMINISTRADOR DE CONEXÃO' : 'PORTAL DO USUÁRIO'}
                  </span>
                </div>
              </div>

              {/* Quick Actions / Balance Controls */}
              <div className="flex items-center space-x-4">
                
                {/* Download standalone ZIP button */}
                <button
                  onClick={handleExportZip}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 active:bg-slate-900 text-slate-300 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 flex items-center gap-1.5 shadow-md cursor-pointer transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exportar ZIP VPS</span>
                </button>

                {/* Real-time Clock widget */}
                <div className="text-right font-mono hidden md:block border-l border-slate-900 pl-4 space-y-0.5">
                  <span className="text-xs font-bold text-slate-300 block">{currentTime}</span>
                  <span className="text-[9px] text-slate-500 font-bold block">15/05/2025</span>
                </div>

                {/* Profile icon widget */}
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-[#BF953F]/30 flex items-center justify-center text-slate-300">
                  <User className="w-5 h-5 text-amber-400" />
                </div>

              </div>

            </header>

            {/* View routing container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* ========================================================
                  CLIENT VIEW (STANDARD USER PREVIEW - Matches input_image_2.png)
                 ======================================================== */}
              {accessMode === 'client' && (
                <div className="max-w-6xl mx-auto space-y-6">
                  
                  {/* Visual Top stats Bar: Watermark, Saldo & Active Signal status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Badge card 1: Logo and account balance selection */}
                    <div className="bg-slate-900/60 border border-[#BF953F]/25 gold-border-glow rounded-2xl p-5 flex items-center justify-between relative overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center opacity-[0.02] pointer-events-none">
                        <svg viewBox="0 0 200 200" className="w-24 h-24 text-amber-400">
                          <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                      <div className="space-y-1.5 relative z-10">
                        <span id="accountTypeLabel" className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Saldo Operacional</span>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${selectedMarket === 'demo' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                          <span id="userBalance" className="text-lg font-extrabold text-white font-mono">
                            {selectedMarket === 'demo' ? `$${balanceDemo.toFixed(2)}` : `$${balanceReal.toFixed(2)}`}
                          </span>
                        </div>
                        <span className="text-[9px] text-[#FCF6BA] font-mono block uppercase">{selectedMarket === 'demo' ? 'CONTA DE SIMULAÇÃO DEMO' : 'CONTA DE PRODUÇÃO REAL'}</span>
                        
                        {/* 3% Fee consent checkbox */}
                        <label className="flex items-center space-x-2 mt-2 cursor-pointer select-none">
                          <input
                            id="acceptFeeCheckbox"
                            type="checkbox"
                            className="rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500/30 w-3.5 h-3.5"
                            defaultChecked={true}
                          />
                          <span className="text-[9px] text-slate-400">Consinto com a taxa de 3% sobre lucros reais</span>
                        </label>
                      </div>
                      <div className="flex flex-col gap-1.5 relative z-10">
                        <button
                          id="demoAccountButton"
                          onClick={() => { setSelectedMarket('demo'); showToast('Modo de Simulação Demo ativo.'); }}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition ${
                            selectedMarket === 'demo' ? 'bg-[#BF953F] text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-900'
                          }`}
                        >
                          Demo
                        </button>
                        <button
                          id="realAccountButton"
                          onClick={() => { setSelectedMarket('real'); showToast('Atenção: Modo de Operação em Conta Real selecionado.'); }}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition ${
                            selectedMarket === 'real' ? 'bg-[#BF953F] text-slate-950 shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-900'
                          }`}
                        >
                          Real
                        </button>
                      </div>
                    </div>

                    {/* Badge card 2: AI Intelligence Sinais monitor box */}
                    <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Monitor de Análise IA</span>
                        <span id="aiMonitorStatus" className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-green animate-pulse"></span>
                      </div>
                      <div className="py-2">
                        {currentClientSignal.status === 'aguardando' ? (
                          <div className="text-xs text-slate-500 italic">Aguardando início do scanner...</div>
                        ) : currentClientSignal.status === 'analisando' ? (
                          <div className="text-xs text-amber-400 animate-pulse font-mono uppercase tracking-widest flex items-center gap-1.5">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Escaneando EUR/USD...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between font-sans">
                            <div>
                              <span id="activeSignal" className={`text-xs font-black px-2 py-0.5 rounded mr-2 ${currentClientSignal.tipo === 'CALL' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                                {currentClientSignal.tipo}
                              </span>
                              <span className="text-xs font-bold text-slate-200">{currentClientSignal.ativo}</span>
                            </div>
                            <span className="text-[10px] text-amber-400 font-mono font-bold">Timer: {currentClientSignal.timer}s (<span id="signalScore">{currentClientSignal.score}</span>%)</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">VAL_OTP_STATUS: LIVE_WEBSOCKET</div>
                    </div>

                    {/* Badge card 3: Deriv Connection validation card */}
                    <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Conexão Deriv</span>
                        <span id="derivConnectionStatus" className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">Online</span>
                      </div>
                      <div className="text-xs font-bold text-slate-300 mt-1 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Sessão Validada</span>
                      </div>
                      <button id="connectDerivButton" onClick={() => showToast('Conexão com a API da Deriv estabelecida.', 'success')} className="mt-2 w-full py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[9px] font-bold text-slate-300 rounded-lg transition cursor-pointer">
                        Conectar Deriv API
                      </button>
                    </div>

                  </div>

                  {/* CUSTOM CLIENT TAB HEADERS (Backtest, Histórico, Lucros e Perdas, Suporte) */}
                  <div className="flex border-b border-slate-900 pb-2 gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest overflow-x-auto scrollbar-none">
                    <button
                      onClick={() => setClientActiveTab('backtest')}
                      className={`pb-2 border-b-2 transition ${
                        clientActiveTab === 'backtest' ? 'border-[#BF953F] text-amber-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Painel Operações (Backtest)
                    </button>
                    
                    <button
                      onClick={() => setClientActiveTab('feed')}
                      className={`pb-2 border-b-2 transition ${
                        clientActiveTab === 'feed' ? 'border-[#BF953F] text-amber-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Feed & Logs VPS
                    </button>
                    
                    <button
                      onClick={() => setClientActiveTab('historico')}
                      className={`pb-2 border-b-2 transition ${
                        clientActiveTab === 'historico' ? 'border-[#BF953F] text-amber-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Histórico de Sinais
                    </button>

                    <button
                      onClick={() => setClientActiveTab('lucros')}
                      className={`pb-2 border-b-2 transition ${
                        clientActiveTab === 'lucros' ? 'border-[#BF953F] text-amber-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Lucros e Perdas (Desempenho)
                    </button>

                    <button
                      onClick={() => setClientActiveTab('suporte')}
                      className={`pb-2 border-b-2 transition ${
                        clientActiveTab === 'suporte' ? 'border-[#BF953F] text-amber-400 font-black' : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      Suporte & Cadastro
                    </button>
                  </div>

                  {/* ==========================================
                      SUBTAB: BACKTEST (MAIN OPERATIONAL PANEL)
                     ========================================== */}
                  {clientActiveTab === 'backtest' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left controls: market selection & start/stop */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Escolha do mercado */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Escolha do Mercado</h3>
                          
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-900 hover:border-slate-800 cursor-pointer transition select-none">
                              <input
                                id="forexM15Button"
                                type="radio"
                                name="client-market-sel"
                                checked={selectedTimeframe === 'Forex M15'}
                                onChange={() => { setSelectedTimeframe('Forex M15'); showToast('Mercado definido: Forex M15'); }}
                                className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-800"
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-200 block">Forex M15</span>
                                <span className="text-[9px] text-slate-500 block uppercase">Análise técnica estendida de 15 minutos</span>
                              </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-900 hover:border-slate-800 cursor-pointer transition select-none">
                              <input
                                id="jumpM2Button"
                                type="radio"
                                name="client-market-sel"
                                checked={selectedTimeframe === 'Jump M2'}
                                onChange={() => { setSelectedTimeframe('Jump M2'); showToast('Mercado definido: Jump M2 (Sintéticos)'); }}
                                className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-800"
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-200 block">Jump M2</span>
                                <span className="text-[9px] text-slate-500 block uppercase">Oscilações velozes de 2 minutos</span>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Bot master controls */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Scanner Inteligente</h3>
                          
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-900">
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase font-bold block">Status do Bot</span>
                              <span className={`text-xs font-black uppercase ${botRunning ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {botRunning ? 'Sintonizado (LIGADO)' : 'Parado'}
                              </span>
                            </div>
                            <span className={`w-2.5 h-2.5 rounded-full ${botRunning ? 'bg-emerald-400 glow-green animate-pulse' : 'bg-slate-600'}`}></span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <button
                              id="startBotButton"
                              onClick={() => { setBotRunning(true); showToast('Analisador do VPS iniciado com sucesso!', 'success'); }}
                              className="py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-widest rounded-xl border border-emerald-500/25 cursor-pointer flex items-center justify-center space-x-1.5 transition"
                            >
                              <Play className="w-3.5 h-3.5 fill-emerald-400" />
                              <span>Ligar Bot</span>
                            </button>
                            <button
                              id="stopBotButton"
                              onClick={() => { setBotRunning(false); showToast('Analisador parado.', 'success'); }}
                              className="py-3.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-[10px] uppercase tracking-widest rounded-xl border border-rose-500/25 cursor-pointer flex items-center justify-center space-x-1.5 transition"
                            >
                              <Square className="w-3.5 h-3.5 fill-rose-400" />
                              <span>Parar Bot</span>
                            </button>
                          </div>
                        </div>

                        {/* AI Signal Identified widget */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4 relative overflow-hidden">
                          {/* Inner glowing effect for active signal */}
                          {botRunning && currentClientSignal.status === 'sinal' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 animate-pulse pointer-events-none" />
                          )}

                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                              <span>Sinal Identificado pela IA</span>
                            </h3>
                            <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                              Neural VPS
                            </span>
                          </div>

                          {!botRunning ? (
                            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-2">
                              <Bot className="w-8 h-8 text-slate-600 mx-auto" />
                              <h4 className="text-xs font-bold text-slate-400">Scanner Desconectado</h4>
                              <p className="text-[10px] text-slate-500 leading-normal">
                                Ligue o bot acima para sincronizar a inteligência artificial com o servidor VPS e receber sinais operacionais.
                              </p>
                            </div>
                          ) : currentClientSignal.status === 'aguardando' || currentClientSignal.status === 'analisando' ? (
                            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-center space-y-3">
                              <RefreshCw className="w-8 h-8 text-amber-400/80 animate-spin mx-auto" />
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-amber-400 animate-pulse">Escaneando Mercado</h4>
                                <p className="text-[10px] text-slate-400 font-mono">Monitorando {selectedAsset}...</p>
                              </div>
                              <p className="text-[9px] text-slate-500 leading-normal">
                                Processando oscilações de preço e padrões gráficos de velas na corretora.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="p-4 rounded-xl bg-slate-950 border border-[#BF953F]/30 shadow-lg shadow-amber-500/5 space-y-3 relative z-10">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold block">ATIVO MONITORADO</span>
                                    <span className="text-sm font-extrabold text-white font-mono">{currentClientSignal.ativo}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold block">PRECISÃO IA</span>
                                    <span className="text-xs font-black text-emerald-400 font-mono">{currentClientSignal.score}%</span>
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                                  <div>
                                    <span className="text-[9px] text-slate-400 uppercase font-mono block">DIREÇÃO DA ENTRADA</span>
                                    <span className={`text-sm font-black tracking-wide ${currentClientSignal.tipo === 'CALL' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                      {currentClientSignal.tipo === 'CALL' ? '▲ COMPRAR (CALL)' : '▼ VENDER (PUT)'}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[9px] text-slate-400 uppercase font-mono block">EXPIRA EM</span>
                                    <span className="text-xs font-bold text-amber-400 font-mono animate-pulse">{currentClientSignal.timer}s</span>
                                  </div>
                                </div>
                                
                                <p className="text-[9.5px] text-[#FCF6BA] font-bold leading-normal text-center bg-amber-500/10 py-2 rounded-lg border border-amber-500/20">
                                  👉 Toque em COMPRAR ou VENDER para operar este sinal manualmente. Não executado automaticamente!
                                </p>
                              </div>

                              {/* Quick active signal operation button shortcut */}
                              <div className="grid grid-cols-2 gap-2 relative z-10">
                                <button
                                  onClick={() => handleManualTrade('CALL')}
                                  className="py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30 cursor-pointer flex items-center justify-center space-x-1 transition"
                                >
                                  <TrendingUp className="w-3 h-3" />
                                  <span>Operar CALL</span>
                                </button>
                                <button
                                  onClick={() => handleManualTrade('PUT')}
                                  className="py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/35 text-rose-400 font-bold text-[10px] uppercase tracking-wider border border-rose-500/30 cursor-pointer flex items-center justify-center space-x-1 transition"
                                >
                                  <TrendingDown className="w-3 h-3" />
                                  <span>Operar PUT</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payout risk checklist terms for real operations */}
                        {selectedMarket === 'real' && (
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                            <div className="flex items-start space-x-3">
                              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Taxa de 3% sobre lucro em Real</h4>
                                <p className="text-[10px] text-slate-400 leading-normal mt-1">
                                  Concorde com a taxa de 3% cobrada sobre cada operação lucrativa em conta real para liberar os sinais.
                                </p>
                              </div>
                            </div>
                            <label className="flex items-center space-x-2 px-1 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={consentChecked}
                                onChange={(e) => setConsentChecked(e.target.checked)}
                                className="h-4 w-4 rounded text-amber-500 border-slate-800 bg-slate-950 focus:ring-amber-500/30"
                              />
                              <span className="text-[10px] font-bold text-slate-300">Aceito e ativo os sinais em conta Real</span>
                            </label>
                          </div>
                        )}

                      </div>

                      {/* Right controls: Line Chart */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        {/* Interactive Line chart */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4 relative overflow-hidden">
                          
                          {/* Absolute gold watermark of brain coin behind the chart */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <BotWatermark className="opacity-[0.06] w-80 h-80" size="100%" />
                          </div>

                          <div className="flex items-center justify-between border-b border-slate-900 pb-3 relative z-10">
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Análise Técnica - Gráfico em Tempo Real</h4>
                              <span className="text-[9px] text-[#FCF6BA] font-mono uppercase">ATIVO DE CONSULTA: {selectedAsset}</span>
                            </div>
                            
                            <select
                              id="assetSelect"
                              value={selectedAsset}
                              onChange={(e) => { setSelectedAsset(e.target.value); showToast(`Monitorando ${e.target.value}`); }}
                              className="bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-3 text-xs font-bold text-slate-300 outline-none focus:border-amber-400 cursor-pointer"
                            >
                              <option value="EUR/USD">EUR/USD (Euro / Dollar)</option>
                              <option value="GBP/USD">GBP/USD (Pound / Dollar)</option>
                              <option value="EUR/JPY">EUR/JPY (Euro / Yen)</option>
                              <option value="AUD/CAD">AUD/CAD (Aussie / Canadian)</option>
                            </select>
                          </div>

                          {/* Live Asset metrics status bar */}
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 bg-slate-950/50 p-3 rounded-2xl border border-slate-900 justify-around relative z-10">
                            <div>
                              <span className="text-slate-500 mr-1">O:</span>
                              <span className="text-emerald-400 font-bold">{(chartBars[chartBars.length - 1]?.open || 0).toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 mr-1">H:</span>
                              <span className="text-amber-400 font-bold">{(chartBars[chartBars.length - 1]?.high || 0).toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 mr-1">L:</span>
                              <span className="text-rose-400 font-bold">{(chartBars[chartBars.length - 1]?.low || 0).toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 mr-1">C:</span>
                              <span className="text-sky-400 font-bold">{(chartBars[chartBars.length - 1]?.close || 0).toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Render of live line chart */}
                          <div id="marketChart" className="h-64 w-full bg-slate-950/60 rounded-2xl p-4 flex flex-col justify-between relative border border-slate-900 overflow-hidden">
                            
                            {/* Timeframe and Candle remaining countdown timers */}
                            <div className="absolute right-4 top-4 flex items-center space-x-2 z-10 select-none">
                              <div className="bg-[#BF953F]/15 border border-[#BF953F]/30 text-amber-400 font-mono font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                                <span>{selectedTimeframe}</span>
                              </div>
                              <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                                <Clock className="w-3 h-3 text-emerald-400 animate-pulse" />
                                <span>Vela termina em: <span id="candleCountdown" className="font-black text-white ml-0.5">{candleTimeLeft}</span></span>
                              </div>
                            </div>

                            {/* SVG representation of prices */}
                            <div className="w-full h-full pt-12 relative">
                              {(() => {
                                const closes = chartBars.map(b => b.close);
                                const minVal = Math.min(...closes) - 8;
                                const maxVal = Math.max(...closes) + 8;
                                const valueRange = (maxVal - minVal) || 1;
                                
                                const svgPoints = chartBars.map((b, i) => {
                                  const x = (i / (chartBars.length - 1)) * 100; // percentage values for responsive SVG lines
                                  // Invert Y coordinate so larger value is higher up (smaller y percentage)
                                  const y = 85 - ((b.close - minVal) / valueRange) * 70; // bounds between 15% and 85%
                                  return { x, y, item: b };
                                });

                                // Build the SVG line d path
                                const linePath = svgPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
                                
                                // Build the shaded area path
                                const areaPath = `${linePath} L 100 100 L 0 100 Z`;

                                const lastPoint = svgPoints[svgPoints.length - 1] || { x: 100, y: 50 };

                                return (
                                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                      {/* Glowing Neon Line Gradient */}
                                      <linearGradient id="neonLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#10B981" />
                                        <stop offset="50%" stopColor="#BF953F" />
                                        <stop offset="100%" stopColor="#FCF6BA" />
                                      </linearGradient>

                                      {/* Area Shading Gradient */}
                                      <linearGradient id="neonAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(191, 149, 63, 0.2)" />
                                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                                      </linearGradient>
                                    </defs>

                                    {/* Horizontal technical grids */}
                                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />

                                    {/* Vertical grids */}
                                    <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />
                                    <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" />

                                    {/* Dotted threshold line at last point's height */}
                                    <line x1="0" y1={lastPoint.y} x2="100" y2={lastPoint.y} stroke="rgba(191, 149, 63, 0.15)" strokeWidth="0.2" strokeDasharray="1,1" />

                                    {/* Area Fill */}
                                    <path d={areaPath} fill="url(#neonAreaGrad)" />

                                    {/* Glow stroke underneath main path for neon effect */}
                                    <path d={linePath} fill="none" stroke="#BF953F" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
                                    
                                    {/* Main Golden/Green Line */}
                                    <path d={linePath} fill="none" stroke="url(#neonLineGrad)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />

                                    {/* Interactive / static data dots */}
                                    {svgPoints.map((pt, index) => (
                                      <g key={index}>
                                        <circle
                                          cx={pt.x}
                                          cy={pt.y}
                                          r="1.2"
                                          fill={pt.item.close >= pt.item.open ? '#10B981' : '#F43F5E'}
                                          stroke="#020617"
                                          strokeWidth="0.3"
                                        />
                                      </g>
                                    ))}

                                    {/* Glowing cursor pulse at latest value */}
                                    <circle cx={lastPoint.x} cy={lastPoint.y} r="2.2" fill="#FCF6BA" opacity="0.4" className="animate-ping" />
                                    <circle cx={lastPoint.x} cy={lastPoint.y} r="0.9" fill="#FFFFFF" />
                                  </svg>
                                );
                              })()}
                            </div>

                          </div>

                        </div>

                        {/* Feed de Sinais & VPS Logs */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4 relative z-10">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                            <span>Feed de Sinais & VPS Logs</span>
                            <span className="flex items-center text-[8px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                              Sincronizado
                            </span>
                          </h3>
                          
                          <div className="divide-y divide-slate-900 max-h-48 overflow-y-auto pr-2 space-y-3">
                            {feedMessages.length === 0 ? (
                              <div className="text-center py-6 text-slate-500 text-xs italic">Nenhum log ou sinal sintonizado no momento.</div>
                            ) : (
                              feedMessages.map((msg, idx) => (
                                <div key={idx} className="flex items-start justify-between py-2 text-[11px] font-mono">
                                  <div className="flex items-start space-x-2.5">
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${msg.color === 'green' ? 'bg-emerald-400' : msg.color === 'red' ? 'bg-rose-500' : 'bg-indigo-400'}`}></span>
                                    <span className="text-slate-300 leading-normal">{msg.text}</span>
                                  </div>
                                  <span className="text-slate-500 text-[10px] shrink-0 ml-3">{msg.time}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* ==========================================
                      SUBTAB: FEED & LOGS (REALTIME STREAM)
                     ========================================== */}
                  {clientActiveTab === 'feed' && (
                    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Feed de Sinais & VPS Logs</h3>
                          <p className="text-xs text-slate-400 font-sans mt-1">Transmissão em tempo real das mensagens analíticas geradas diretamente na VPS.</p>
                        </div>
                        <span className="flex items-center text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                          VPS Ativo
                        </span>
                      </div>

                      <div id="userFeed" className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 relative overflow-hidden min-h-[300px]">
                        {/* Shaded golden neural coin decoration in background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                          <svg viewBox="0 0 100 100" className="w-64 h-64 text-amber-400">
                            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
                            <path d="M50,15 L50,85 M15,50 L85,50" stroke="currentColor" strokeWidth="0.5" />
                          </svg>
                        </div>

                        <div className="divide-y divide-slate-900 max-h-[480px] overflow-y-auto pr-2 space-y-3 relative z-10">
                          {feedMessages.length === 0 ? (
                            <div className="text-center py-16 text-slate-500 text-xs italic">Nenhum log ou sinal sintonizado no momento.</div>
                          ) : (
                            feedMessages.map((msg, idx) => (
                              <div key={idx} className="flex items-start justify-between py-3 text-xs font-mono">
                                <div className="flex items-start space-x-3">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 ${msg.color === 'green' ? 'bg-emerald-400 shadow-md animate-pulse' : msg.color === 'red' ? 'bg-rose-500 shadow-md animate-pulse' : 'bg-indigo-400 shadow-md'}`}></span>
                                  <span className="text-slate-200 leading-relaxed">{msg.text}</span>
                                </div>
                                <span className="text-slate-500 text-[10px] shrink-0 ml-4 font-bold">{msg.time}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==========================================
                      SUBTAB: HISTÓRICO (PAST CONTRACTS)
                     ========================================== */}
                  {clientActiveTab === 'historico' && (
                    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Sinais Liquidados</h3>
                          <p className="text-xs text-slate-400 font-sans mt-1">Lista das últimas decisões geradas pela inteligência analítica na VPS.</p>
                        </div>
                        <button
                          onClick={() => { setSignalsHistory([]); showToast('Histórico limpo'); }}
                          className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Limpar Histórico
                        </button>
                      </div>

                      <div className="overflow-x-auto bg-slate-950/40 rounded-2xl border border-slate-900">
                        <table id="signalsHistoryTable" className="w-full text-left border-collapse text-xs font-sans">
                          <thead>
                            <tr className="border-b border-slate-900 bg-slate-900/40 text-slate-500 font-bold uppercase tracking-wider">
                              <th className="p-4">Hora</th>
                              <th className="p-4">Ativo</th>
                              <th className="p-4">Sinal</th>
                              <th className="p-4">Resultado</th>
                              <th className="p-4">Valor</th>
                              <th className="p-4">Payout</th>
                              <th className="p-4">Score IA</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900/50">
                            {signalsHistory.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-900/10 transition">
                                <td className="p-4 font-mono text-slate-400">{row.hora}</td>
                                <td className="p-4 font-bold text-slate-200">{row.ativo}</td>
                                <td className={`p-4 font-black ${row.sinal === 'CALL' ? 'text-emerald-400' : 'text-rose-400'}`}>{row.sinal}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                    row.resultado.includes('WIN') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {row.resultado}
                                  </span>
                                </td>
                                <td className="p-4 font-mono text-slate-300">{row.stake}</td>
                                <td className="p-4 font-mono text-slate-400">{row.payout}</td>
                                <td className="p-4 font-mono text-amber-400 font-bold">{row.score}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ==========================================
                      SUBTAB: LUCROS E PERDAS (PERFORMANCE GRAPHS)
                     ========================================== */}
                  {clientActiveTab === 'lucros' && (
                    <div className="space-y-6">
                      
                      {/* Grid stats overview */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Vitórias de Hoje</span>
                          <span id="winsValue" className="text-xl font-extrabold text-emerald-400 block mt-1.5">{winsCount} WINS</span>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Derrotas de Hoje</span>
                          <span id="lossesValue" className="text-xl font-extrabold text-rose-500 block mt-1.5">{lossesCount} LOSS</span>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Taxa de Assertividade</span>
                          <span id="accuracyValue" className="text-xl font-extrabold text-[#FCF6BA] block mt-1.5">90.14%</span>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-center">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Lucro Acumulado</span>
                          <span id="totalProfitValue" className="text-xl font-extrabold text-emerald-400 block mt-1.5">+{profitAccumulated.toFixed(2)}</span>
                        </div>

                      </div>

                      {/* Performance Area chart spline */}
                      <div className="bg-slate-900/40 border border-[#BF953F]/25 gold-border-glow rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Curva de Lucro de Transações</h4>
                          <span className="text-[9px] text-[#FCF6BA] font-mono">STABLE_METRICS_PRO</span>
                        </div>

                        <div id="profitChart" className="h-44 w-full bg-slate-950 rounded-2xl flex items-end p-2 relative overflow-hidden">
                          <svg className="w-full h-full text-amber-500/10" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="glowG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#BF953F" stopOpacity="0.2"></stop>
                                <stop offset="100%" stopColor="#BF953F" stopOpacity="0.0"></stop>
                              </linearGradient>
                            </defs>
                            <path d="M0,90 Q50,40 100,55 T200,28 T300,34 T400,12 L400,100 L0,100" fill="url(#glowG)" />
                            <path d="M0,90 Q50,40 100,55 T200,28 T300,34 T400,12" fill="none" stroke="#BF953F" strokeWidth="2.5" />
                          </svg>
                          <div className="absolute inset-x-4 bottom-2 flex justify-between text-[9px] font-mono text-slate-600">
                            <span>Sinal 1</span>
                            <span>Sinal 3</span>
                            <span>Sinal 5</span>
                            <span>Sinal 7</span>
                            <span>Sinal Atual</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ==========================================
                      SUBTAB: SUPORTE & CADASTRO (OFFICIAL LINKS)
                     ========================================== */}
                  {clientActiveTab === 'suporte' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Support contacts */}
                      <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Canais de Atendimento Suporte</h3>
                        
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Se você tiver dúvidas sobre ativação de chaves de API, saques ou conciliação da taxa de 3% sobre lucros na conta real, fale diretamente conosco pelos canais oficiais:
                        </p>

                        <div className="space-y-3 font-sans">
                          
                          {/* Telegram Link */}
                          <a
                            href="https://t.me/botiaforex"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 transition"
                          >
                            <div className="flex items-center space-x-3">
                              <MessageCircle className="w-5 h-5 text-sky-400 shrink-0" />
                              <div>
                                <span className="text-xs font-bold text-white block">Suporte Oficial Telegram</span>
                                <span className="text-[10px] text-slate-400">@botiaforex</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                          </a>

                          {/* Instagram Link */}
                          <a
                            href="https://www.instagram.com/botiaforexofc?igsh=MW04emM4bjh5YnZobA=="
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-900 transition"
                          >
                            <div className="flex items-center space-x-3">
                              <Instagram className="w-5 h-5 text-rose-400 shrink-0" />
                              <div>
                                <span className="text-xs font-bold text-white block">Instagram Oficial</span>
                                <span className="text-[10px] text-[#FCF6BA] font-bold">@botiaforexofc</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                          </a>

                        </div>

                      </div>

                      {/* Broker sign up details */}
                      <div className="bg-slate-900/40 border border-[#BF953F]/25 gold-border-glow rounded-3xl p-6 flex flex-col justify-between">
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Corretora Parceira Oficial</h3>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Para operar com o robô de forma estável, conecte o painel em contas abertas exclusivamente através de nosso link de afiliação oficial Deriv. Isso garante compatibilidade com as rotas de VPS e segurança transacional criptografada.
                          </p>
                        </div>

                        <div className="pt-6">
                          <a
                            href="https://partner-tracking.deriv.com/click?a=26974&o=1&c=3&link_id=1"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full block py-4 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl hover:opacity-95 active:scale-95 text-center shadow-lg shadow-amber-500/10 transition"
                          >
                            Cadastrar Conta na Deriv
                          </a>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* ========================================================
                  ADMINISTRATOR VIEW (Full tabs & VPS Technical API checker)
                 ======================================================== */}
              {accessMode === 'admin' && (
                <div id="adminPanelContainer" className="max-w-7xl mx-auto space-y-6">
                  
                  {/* Quick Admin bar switches */}
                  <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Módulos Administrativos do VPS Host</h3>
                        <p className="text-[10px] text-slate-400">Ambiente de auditoria e monitoramento de API criptografada.</p>
                      </div>
                    </div>
                    
                    {/* Exporter triggers */}
                    <button
                      onClick={() => { setAccessMode('client'); showToast('Modo visual alterado para CLIENTE.'); }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-[#FCF6BA] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
                    >
                      Visualizar como Cliente
                    </button>
                  </div>

                  {/* ==========================================
                      ADMIN TAB: VALIDADOR VPS API (Technical Step-by-Step)
                     ========================================== */}
                  {adminActiveTab === 'vps_api' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left col: Step tests */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        <div className="bg-[#BF953F]/5 border border-[#BF953F]/25 rounded-2xl p-5 space-y-2">
                          <h3 className="text-xs font-bold text-[#FCF6BA] uppercase tracking-wide flex items-center">
                            <Database className="w-4 h-4 mr-2" />
                            Mapeamento de Endpoints VPS de Baixo Nível
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Esta área executa testes reais de cabeçalhos, OTP, chaves de concorrência e mapeamento de sessões HTTP persistentes com a URL deVPS (<span className="font-mono text-amber-400">https://api.botiaforex.com.br</span>) operando com o cabeçalho <span className="font-mono text-amber-400">credentials: "include"</span>.
                          </p>
                        </div>

                        {/* Step 1 */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 uppercase tracking-widest font-mono">Etapa 01</span>
                            <h3 className="text-sm font-bold text-white mt-2">Saúde da API (GET /health)</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Testar tempo de resposta e integridade das rotas na nuvem.</p>
                          </div>
                          <button
                            onClick={() => showToast('GET https://api.botiaforex.com.br/health -> Retorno 200 OK')}
                            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-[#FCF6BA] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
                          >
                            Testar Canal de Comunicação
                          </button>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 uppercase tracking-widest font-mono">Etapa 02</span>
                            <h3 className="text-sm font-bold text-white mt-2">Iniciação OAuth Deriv (REDIRECT /auth/deriv/start)</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Executar redirecionamento autenticado oficial da corretora.</p>
                          </div>
                          <button
                            onClick={() => showToast('Redirecionando via redirecionamento seguro da VPS...')}
                            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-[#FCF6BA] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
                          >
                            Simular Handshake Deriv
                          </button>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                          <div>
                            <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 uppercase tracking-widest font-mono">Etapa 03</span>
                            <h3 className="text-sm font-bold text-white mt-2">Lista de Sessões (GET /auth/deriv/accounts)</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">Retorna contas cadastradas ativas e os respectivos saldos.</p>
                          </div>
                          <button
                            onClick={() => showToast('Contas recuperadas: CR4829141 (Demo) | CR9842104 (Real)')}
                            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-[#FCF6BA] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
                          >
                            Solicitar Session List
                          </button>
                        </div>

                      </div>

                      {/* Right col: Stats & terminal */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Terminal emulator */}
                        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">VPS Engine Output</span>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                          </div>

                          <div className="h-48 w-full bg-slate-950 rounded-xl p-3 font-mono text-[10px] text-slate-300 space-y-2 overflow-y-auto">
                            <div>[SYSTEM] Ingressando canal REST do host VPS...</div>
                            <div className="text-emerald-400">[SUCCESS] Rota /health respondeu em 24ms</div>
                            <div className="text-amber-400">[WARNING] Sessão temporária ativa expire em 240 minutos</div>
                            <div>[INFO] UUID idempotência transacional ativo.</div>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* ==========================================
                      ADMIN TAB: PAINEL GERAL (MONITOR STATE)
                     ========================================== */}
                  {adminActiveTab === 'painel_geral' && (
                    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-6">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Estatísticas Gerais de Transações VPS</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-slate-950 p-4 rounded-xl text-center">
                          <span className="text-[9px] text-slate-500 uppercase font-bold block">Conexões no Domínio</span>
                          <span className="text-lg font-extrabold text-amber-400 block mt-1.5">1,245 Clientes</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl text-center">
                          <span className="text-[9px] text-slate-500 uppercase font-bold block">Ordens Executadas</span>
                          <span className="text-lg font-extrabold text-emerald-400 block mt-1.5">42,951 Sinais</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl text-center">
                          <span className="text-[9px] text-slate-500 uppercase font-bold block">Acertos Totais (Winrate)</span>
                          <span className="text-lg font-extrabold text-white block mt-1.5">72.48% WIN</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl text-center">
                          <span className="text-[9px] text-slate-500 uppercase font-bold block">Taxas Acumuladas 3%</span>
                          <span className="text-lg font-extrabold text-emerald-400 block mt-1.5">+$14,295.40</span>
                        </div>
                      </div>

                      {/* Painel de Controle de Variáveis VPS Simulado */}
                      <div className="bg-slate-950 border border-[#BF953F]/30 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                            <Bot className="w-4 h-4 text-[#BF953F]" />
                            <span>Controles e Parâmetros VPS IA</span>
                          </h4>
                          <span className="text-[9px] text-slate-500 font-mono font-bold">API CONSOLE v1.02</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Col 1: Ajuste de Assertividade e Payout */}
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Histórico de Assertividade</h5>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">VITÓRIAS (WINS)</label>
                                <input
                                  id="winsInput"
                                  type="number"
                                  value={adminWinsInput}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    setAdminWinsInput(val);
                                    setWinsCount(val);
                                  }}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">DERROTAS (LOSSES)</label>
                                <input
                                  id="lossesInput"
                                  type="number"
                                  value={adminLossesInput}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    setAdminLossesInput(val);
                                    setLossesCount(val);
                                  }}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-amber-400"
                                />
                              </div>
                            </div>

                          </div>

                          {/* Col 2: Payout & Pontuação Mínima */}
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Configuração de Parâmetros</h5>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">PAYOUT ATIVO (%)</label>
                                <input
                                  id="payoutInput"
                                  type="number"
                                  value={adminPayoutInput}
                                  onChange={(e) => setAdminPayoutInput(parseInt(e.target.value) || 0)}
                                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">PRECISÃO DA IA (%)</label>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    value={adminScoreInput}
                                    onChange={(e) => setAdminScoreInput(parseInt(e.target.value) || 0)}
                                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-mono text-white outline-none focus:border-amber-400"
                                  />
                                  <button
                                    id="setScoreButton"
                                    onClick={() => {
                                      setCurrentClientSignal(prev => ({ ...prev, score: adminScoreInput }));
                                      showToast(`Precisão da IA definida para ${adminScoreInput}%!`, 'success');
                                      setAdminLogsList(prev => [
                                        `[${new Date().toLocaleTimeString('pt-BR')}] ADMIN: Definiu assertividade mínima para ${adminScoreInput}%`,
                                        ...prev
                                      ]);
                                    }}
                                    className="px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-[10px] uppercase cursor-pointer"
                                  >
                                    Definir
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Col 3: Status de Rede & Ação Rápida */}
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ações e Usuários</h5>
                            
                            <div className="space-y-3">
                              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                                <span className="text-[9px] text-slate-500 font-bold uppercase block">Usuários Conectados VPS</span>
                                <span id="activeUsersValue" className="text-sm font-extrabold text-amber-400 font-mono block mt-1">{activeUsersCount} usuários ativos</span>
                              </div>

                              <button
                                id="triggerSignalButton"
                                onClick={() => {
                                  const types: ('CALL' | 'PUT')[] = ['CALL', 'PUT'];
                                  const randomType = types[Math.floor(Math.random() * types.length)];
                                  const score = adminScoreInput;
                                  setCurrentClientSignal({
                                    ativo: selectedAsset,
                                    tipo: randomType,
                                    score,
                                    timer: 15,
                                    status: 'sinal'
                                  });
                                  showToast(`Sinal Forçado: ${randomType} em ${selectedAsset} com ${score}% de score!`, 'success');
                                  setAdminLogsList(prev => [
                                    `[${new Date().toLocaleTimeString('pt-BR')}] VPS: Forçado novo sinal manual de ${randomType} em ${selectedAsset}`,
                                    ...prev
                                  ]);
                                }}
                                className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Disparar Sinal IA</span>
                              </button>
                            </div>

                          </div>

                        </div>

                        {/* Audit Trail Logs */}
                        <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Logs de Auditoria Administrativa</label>
                          <div id="adminLogs" className="h-32 bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-[9px] text-[#FCF6BA] space-y-1.5 overflow-y-auto">
                            {adminLogsList.map((log, i) => (
                              <div key={i} className={log.includes('VPS') ? 'text-amber-400' : log.includes('ADMIN') ? 'text-sky-400' : ''}>
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* ==========================================
                      ADMIN TAB: CONFIGURAÇÃO VPS
                     ========================================== */}
                  {adminActiveTab === 'configuracoes' && (
                    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Ajustes Básicos de Comunicação VPS</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Domínio da API VPS</label>
                          <input
                            type="text"
                            readOnly
                            value="https://api.botiaforex.com.br"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs font-mono text-slate-300 outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">ID do Aplicativo Deriv (App ID)</label>
                          <input
                            type="text"
                            readOnly
                            value="36421"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs font-mono text-slate-300 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </main>

        </div>
      )}

    </div>
  );
}
