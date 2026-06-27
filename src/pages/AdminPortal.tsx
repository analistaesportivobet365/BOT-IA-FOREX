import React from 'react';
import {
  ShieldCheck,
  Database,
  Bot,
  Sparkles
} from 'lucide-react';

interface AdminPortalProps {
  accessMode: 'client' | 'admin';
  setAccessMode: (mode: 'client' | 'admin') => void;
  adminActiveTab: 'vps_api' | 'painel_geral';
  setAdminActiveTab: (tab: 'vps_api' | 'painel_geral') => void;
  
  // Wins/Losses
  adminWinsInput: number;
  setAdminWinsInput: (val: number) => void;
  adminLossesInput: number;
  setAdminLossesInput: (val: number) => void;
  setWinsCount: (val: number) => void;
  setLossesCount: (val: number) => void;

  // Parameters
  adminPayoutInput: number;
  setAdminPayoutInput: (val: number) => void;
  adminScoreInput: number;
  setAdminScoreInput: (val: number) => void;

  // Signal state
  selectedAsset: string;
  setCurrentClientSignal: React.Dispatch<React.SetStateAction<{
    ativo: string;
    tipo: 'CALL' | 'PUT';
    score: number;
    timer: number;
    status: 'analisando' | 'sinal' | 'win' | 'loss' | 'gale';
  } | null>>;

  // Logs and counts
  activeUsersCount: number;
  adminLogsList: string[];
  setAdminLogsList: React.Dispatch<React.SetStateAction<string[]>>;

  // Toast
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function AdminPortal({
  accessMode,
  setAccessMode,
  adminActiveTab,
  setAdminActiveTab,
  adminWinsInput,
  setAdminWinsInput,
  adminLossesInput,
  setAdminLossesInput,
  setWinsCount,
  setLossesCount,
  adminPayoutInput,
  setAdminPayoutInput,
  adminScoreInput,
  setAdminScoreInput,
  selectedAsset,
  setCurrentClientSignal,
  activeUsersCount,
  adminLogsList,
  setAdminLogsList,
  showToast
}: AdminPortalProps) {
  return (
    <div id="adminPanelContainer" className="max-w-7xl mx-auto space-y-6 font-sans">
      
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
        
        {/* Navigation triggers */}
        <div className="flex gap-2">
          <button
            onClick={() => setAdminActiveTab(adminActiveTab === 'vps_api' ? 'painel_geral' : 'vps_api')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
          >
            Aba: {adminActiveTab === 'vps_api' ? 'Painel de Controle' : 'Validador API'}
          </button>
          <button
            onClick={() => { setAccessMode('client'); showToast('Modo visual alterado para CLIENTE.'); }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-[#FCF6BA] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-slate-800 cursor-pointer"
          >
            Visualizar como Cliente
          </button>
        </div>
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
                Esta área executa testes reais de cabeçalhos, OTP, chaves de concorrência e mapeamento de sessões HTTP persistentes com a URL de VPS (<span className="font-mono text-amber-400">https://api.botiaforex.com.br</span>) operando com o cabeçalho <span className="font-mono text-amber-400">credentials: "include"</span>.
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
                          setCurrentClientSignal(prev => prev ? { ...prev, score: adminScoreInput } : null);
                          showToast(`Precisão da IA definida para ${adminScoreInput}%!`, 'success');
                          setAdminLogsList(prev => [
                            `[${new Date().toLocaleTimeString('pt-BR')}] ADMIN: Definiu assertividade mínima para ${adminScoreInput}%`,
                            ...prev
                          ]);
                        }}
                        className="px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-[10px] uppercase cursor-pointer border-none"
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
                    className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded-xl font-bold text-[10px] uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-1.5 border-none"
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
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
