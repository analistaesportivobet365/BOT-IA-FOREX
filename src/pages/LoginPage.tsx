import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Mail,
  Lock,
  EyeOff,
  Eye,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import BotWatermark from '../components/BotWatermark';

interface LoginPageProps {
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
  setCurrentScreen: (screen: 'landing' | 'login' | 'loading' | 'panel') => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function LoginPage({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  setCurrentScreen,
  showToast
}: LoginPageProps) {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-6 bg-slate-950 overflow-hidden font-sans">
      
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
            &larr; Voltar para apresentação
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
  );
}
