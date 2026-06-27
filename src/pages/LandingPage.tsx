import React from 'react';
import {
  Activity,
  MessageCircle,
  Sparkles,
  Check,
  ChevronRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import BotWatermark from '../components/BotWatermark';

interface LandingPageProps {
  setCurrentScreen: (screen: 'landing' | 'login' | 'loading' | 'panel') => void;
}

export default function LandingPage({ setCurrentScreen }: LandingPageProps) {
  return (
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

          {/* Right Column: Visual Mockup card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing ring under the card */}
            <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl -z-10 animate-pulse-slow"></div>

            {/* Smartphone visual frame container */}
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
      <footer className="w-full border-t border-slate-900 bg-slate-950 py-10 mt-auto font-sans">
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
  );
}
