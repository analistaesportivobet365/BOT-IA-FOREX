# ROUTES-INTEGRATION.md - Manual de Integração API VPS & Corretora Deriv

Este arquivo detalha todos os seletores HTML (IDs) criados no front-end do **Bot IA Forex** para mapeamento direto com as rotas HTTP e WebSockets do servidor VPS e os endpoints da Deriv.

---

## 1. Mapeamento de Rotas e Elementos HTML (IDs)

O front-end está 100% preparado para conexões dinâmicas de baixo nível operando com as credenciais seguras do VPS (`credentials: "include"`) para gerenciar chaves de sessão e cookies HTTP protegidos.

| ID do Elemento | Tela / Componente | Descrição / Função | Tipo de Elemento | Ação de Integração VPS Recomendada |
| :--- | :--- | :--- | :--- | :--- |
| **`telegramButton`** | Landing Page | Link direto para o canal oficial do Telegram do Bot. | `<a>` | Atualizar dinamicamente via arquivo de configuração ou API. |
| **`accessPanelButton`** | Landing Page | Botão de "Acessar Painel de Controle" / Redirecionar. | `<button>` | Altera o estado do router React (`currentScreen`) para `'login'`. |
| **`registerDerivButton`** | Landing Page | Link para o registro de novos afiliados na Deriv. | `<a>` | Carrega o link oficial do programa de afiliados do proprietário. |
| **`backToLandingButton`**| Tela de Login | Botão para retroceder à página de apresentação. | `<button>` | Altera o estado para `'landing'`. |
| **`loginEmail`** | Tela de Login | Campo de entrada para o e-mail do usuário. | `<input>` | Captura a credencial do usuário em tempo real. |
| **`loginPassword`** | Tela de Login | Campo de entrada para a senha criptografada. | `<input>` | Captura a credencial de segurança. |
| **`loginButton`** | Tela de Login | Botão para submeter as credenciais e logar. | `<button>` | Dispara chamada HTTP `POST /api/auth/login`. Em caso de sucesso, inicia contagem de login e vai para `'loading'`. |
| **`createDerivAccountButton`** | Tela de Login | Link auxiliar para criação de conta de corretagem. | `<button>` | Abre modal explicativo de afiliados ou link direto da Deriv. |
| **`loginMessage`** | Tela de Login | Bloco dinâmico de erros ou avisos de autenticação. | `<div>` | Exibe mensagens amigáveis retornadas pela API VPS em caso de falha de login. |
| **`syncProgress`** | Sincronização | Barra visual de progresso da conexão do bot com a VPS. | `<div>` | Vincula a largura (`style.width`) ao progresso dinâmico de conexões. |
| **`syncPercentage`** | Sincronização | Texto representativo da porcentagem (ex: `45%`). | `<span>` | Mostra numericamente o status de carregamento. |
| **`syncLogs`** | Sincronização | Bloco de texto simulando console de logs do robô. | `<div>` | Recebe mensagens dinâmicas de handshake da corretora em tempo real. |
| **`syncVpsStatus`** | Sincronização | Status de inicialização do Servidor Central VPS. | `<span>` | Muda de "Carregando" para "Conectado" ou IP da máquina host. |
| **`syncApiStatus`** | Sincronização | Conexão de Handshake com a API da Corretora. | `<span>` | Muda de "Sincronizando" para "OK (Chave Validada)". |
| **`syncAiStatus`** | Sincronização | Inicialização do Modelo de Rede Neural M15/M2. | `<span>` | Mostra status de carregamento dos coeficientes neurais do cérebro. |
| **`syncSignalsStatus`** | Sincronização | Status final do canal dinâmico de sinais. | `<span>` | Mostra "Ativo" ao finalizar os 10 segundos de preparação. |
| **`userBalance`** | Portal do Usuário | Exibe o saldo da conta selecionada (Demo/Real). | `<span>` | Subscreve via WebSocket ao canal `balance` da Deriv API para atualização automática. |
| **`accountTypeLabel`** | Portal do Usuário | Texto amigável indicando o modo de conta operacional. | `<span>` | Alterna entre "CONTA DEMO" ou "CONTA REAL" com base no mercado ativo. |
| **`demoAccountButton`** | Portal do Usuário | Botão seletor para ativar a Conta de Simulação Demo. | `<button>` | Define o mercado ativo no front-end para simulação (`selectedMarket = "demo"`). |
| **`realAccountButton`** | Portal do Usuário | Botão seletor para ativar a Conta Real de Produção. | `<button>` | Define o mercado real (`selectedMarket = "real"`). Exige aceitação de termos. |
| **`acceptFeeCheckbox`** | Portal do Usuário | Consentimento da cobrança automática da taxa de 3%. | `<input>` | Garante conformidade do usuário com as regras comerciais. Bloqueia sinais reais se desmarcado. |
| **`aiMonitorStatus`** | Portal do Usuário | Indicador visual de integridade de IA sintonizada. | `<span>` | Pisca em verde (`bg-emerald-400`) se o WebSocket VPS estiver transmitindo palpites. |
| **`derivConnectionStatus`**| Portal do Usuário | Badge de status de conexão com os servidores da corretora. | `<span>` | Exibe "Online", "Desconectado" ou "Reconectando...". |
| **`connectDerivButton`** | Portal do Usuário | Gatilho para renovar o login via token API. | `<button>` | Abre prompt para inserção de Token Deriv caso a sessão VPS expire. |
| **`activeSignal`** | Portal do Usuário | Sinalização de CALL (Compra) ou PUT (Venda) detectado. | `<span>` | Mostra em tempo real a sugestão ativa transmitida pelo bot. |
| **`signalScore`** | Portal do Usuário | Percentual de precisão probabilística do sinal (ex: `92%`).| `<span>` | Reflete o score retornado pela inferência da rede neural VPS. |
| **`forexM15Button`** | Portal do Usuário | Radio button para selecionar o mercado Forex M15. | `<input>` | Envia sinalizador à VPS para focar processamento no canal Forex de 15 minutos. |
| **`jumpM2Button`** | Portal do Usuário | Radio button para selecionar o mercado sintético Jump M2. | `<input>` | Envia sinalizador à VPS para focar processamento no canal Jump de 2 minutos. |
| **`startBotButton`** | Portal do Usuário | Botão de ignição do scanner inteligente VPS. | `<button>` | Dispara requisição HTTP `POST /api/bot/start` no servidor de sinais. |
| **`stopBotButton`** | Portal do Usuário | Botão de parada emergencial do scanner inteligente VPS. | `<button>` | Dispara requisição HTTP `POST /api/bot/stop`. |
| **`assetSelect`** | Portal do Usuário | Dropdown seletor de par de moedas ou ativo. | `<select>` | Altera a subscrição dinâmica dos dados de ticks no WebSocket da Deriv. |
| **`candleCountdown`** | Portal do Usuário | Contador regressivo para fechamento da vela técnica. | `<span>` | Exibe os segundos ou minutos restantes para o fim do candle atual. |
| **`marketChart`** | Portal do Usuário | Container principal renderizando o gráfico temporal. | `<div>` | Renderiza dados reais recebidos da Deriv API (pode ser integrado com biblioteca D3 ou Recharts). |
| **`userFeed`** | Portal do Usuário | Transmissão de logs de atividade técnica e VPS. | `<div>` | Alimentado via stream EventSource (SSE) ou WebSocket do VPS. |
| **`signalsHistoryTable`** | Portal do Usuário | Tabela de listagem de histórico de sinais anteriores. | `<table>` | Preenchida com requisição HTTP `GET /api/signals/history`. |
| **`winsValue`** | Portal do Usuário | Quantidade acumulada de sinais vencedores no dia. | `<span>` | Puxado dinamicamente das estatísticas diárias do usuário. |
| **`lossesValue`** | Portal do Usuário | Quantidade acumulada de sinais perdedores no dia. | `<span>` | Puxado dinamicamente das estatísticas diárias do usuário. |
| **`accuracyValue`** | Portal do Usuário | Porcentagem consolidada de acertos (ex: `89.5%`). | `<span>` | Calculado por `(Wins / (Wins + Losses)) * 100`. |
| **`totalProfitValue`** | Portal do Usuário | Lucro líquido acumulado nas operações reais de hoje. | `<span>` | Soma dos valores das transações líquidas. |
| **`profitChart`** | Portal do Usuário | Curva de lucratividade em gráfico vetorial dinâmico. | `<div>` | Desenha vetor SVG com base na progressão histórica de ganhos. |
| **`logoutButton`** | Portal do Usuário | Botão para deslogar da sessão e limpar as credenciais. | `<button>` | Limpa dados locais, chama `GET /api/auth/logout` no VPS e desliga o robô. |
| **`adminPanelContainer`**| Painel Admin | Container geral do módulo administrativo. | `<div>` | Protegido por autenticação com nível de acesso administrativo no back-end. |
| **`winsInput`** | Painel Admin | Input de definição manual do contador de Vitórias diárias. | `<input>` | Permite ao administrador calibrar/alterar os valores fictícios mostrados ao cliente. |
| **`lossesInput`** | Painel Admin | Input de definição manual do contador de Derrotas diárias. | `<input>` | Permite ao administrador calibrar/alterar os valores fictícios mostrados ao cliente. |
| **`payoutInput`** | Painel Admin | Input de calibração de payout global da corretora. | `<input>` | Atualiza as simulações matemáticas de lucros reais. |
| **`activeUsersValue`** | Painel Admin | Contador dinâmico de clientes atualmente conectados na VPS. | `<span>` | Monitorado por sockets ativos no servidor de sinalização em tempo real. |
| **`triggerSignalButton`** | Painel Admin | Botão para disparar manualmente uma ordem/sinal de IA. | `<button>` | Dispara de forma forçada um broadcast de sinal para todos os clientes ativos. |
| **`setScoreButton`** | Painel Admin | Botão para fixar o patamar de assertividade probabilística. | `<button>` | Envia as atualizações de precisão simulada da IA à VPS. |
| **`adminLogs`** | Painel Admin | Console técnico contendo o trail log de auditoria da VPS. | `<div>` | Conectado aos logs de erro e logs HTTP reais do host Docker VPS. |

---

## 2. Sugestão Prática de Fluxo de Autenticação e Sessão (Cookies Seguros)

Para conectar o front-end ao back-end real do VPS sem expor tokens confidenciais da Deriv aos navegadores dos clientes, implemente o seguinte padrão:

```ts
// Exemplo de chamada de login segura a partir do loginButton
async function handleLogin(email, password) {
  try {
    const response = await fetch("https://api.botiaforex.com.br/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      // O Servidor VPS deve retornar um cabeçalho Set-Cookie com as opções:
      // Secure, HttpOnly, SameSite=None ou Lax, de forma que as chaves de sessão
      // permaneçam salvas sob criptografia invisível ao JS cliente.
      return true;
    }
  } catch (error) {
    console.error("Erro na autenticação VPS:", error);
  }
}
```

---

## 3. Estrutura do Pacote e Execução Standalone

O pacote gerado foi otimizado para build rápido através do bundler **Vite** com **Tailwind CSS v4** integrado:

*   **`package.json`**: Contém todos os pacotes necessários (`lucide-react`, `motion`, etc.).
*   **`src/App.tsx`**: Contém todo o roteamento lógico de telas, estados e marcações necessárias.
*   **`index.html`**: Ponto de entrada padrão carregando o script modular.
*   **`vite.config.ts`**: Configuração simplificada para escutar na porta correta (`3000`) e hospedar sem travamentos.
