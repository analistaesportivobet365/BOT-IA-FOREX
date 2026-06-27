# Bot IA Forex - Painel Operacional Inteligente 🚀

Este é o projeto completo do **Bot IA Forex**, desenvolvido com **React 19**, **Vite** e **Tailwind CSS v4**. Ele inclui tanto a **página de apresentação de alta conversão (Landing Page)** quanto o **Painel Operacional Avançado (Dashboard)** completo com sistema de monitoramento de sinais em tempo real, gráficos interativos e simulador de operações.

---

## 💻 Recursos do Projeto

### 🌐 1. Landing Page (Apresentação Comercial)
- **Visual Premium**: Design sofisticado com tons escuros (Deep Slate/Onyx) e detalhes dourados reluzentes (`gold-border-glow`).
- **Garantias e Depoimentos**: Sessões comerciais pensadas para converter visitantes em clientes.
- **Conectividade**: Botões funcionais para criação de conta na Deriv e acesso direto à área do painel.

### 🛡️ 2. Tela de Login com Conexão Segura
- **Login Realista**: Opção de acesso para clientes normais ou acesso administrativo.
- **Simulador de Conexão Neural (10 segundos)**: Ao clicar em "Conectar", o sistema inicia um fluxo de carregamento de exatamente 10 segundos, exibindo etapas detalhadas:
  - Handshake criptografado com a VPS de alta frequência.
  - Autenticação de chaves RSA de segurança.
  - Sincronização de IA e backtests históricos de sinais.
  - Varredura de oscilações do mercado e calibração de precisão.
  - Terminal de logs do sistema ativo em tempo real.

### 📊 3. Painel de Controle Operacional (Client Mode)
- **Gráfico de Velas (Candlestick Chart) Interativo**: Fluctuando dinamicamente em tempo real simulando o mercado financeiro.
- **Sinal Identificado pela Inteligência Artificial**: Widget de inteligência artificial (`Neural VPS`) que exibe alertas preditivos para operações manuais de `CALL` (Comprar) ou `PUT` (Vender) com score de precisão atualizado.
- **Feed de Sinais & VPS Logs**: Logs de telemetria reais integrados no lado direito do gráfico, mostrando a recepção de sinais da VPS e operações em andamento.
- **Histórico de Operações**: Lista de contratos anteriores para monitorar lucratividade e taxa de sucesso (Winrate).
- **Abas Auxiliares**:
  - **Backtest**: Comparativo de desempenho dos algoritmos com score de assertividade.
  - **Histórico Completo**: Tabela detalhada de todas as operações fechadas.
  - **Lucros Acumulados**: Visualizador gráfico financeiro de ganhos por dia.
  - **Suporte**: Canal de comunicação direto por Telegram e material educativo.

### 👑 4. Painel de Controle Geral do Administrador (Admin Mode)
- **Acesso Adm**: Acesse com o e-mail `admin@botiaforex.com` e a senha `admin`.
- **Configurações da VPS**: Gerencie chaves de API, configure limites de Gale, controle o multiplicador e gerencie o status do bot.
- **Painel Geral de Usuários**: Veja dados de usuários conectados e monitore a infraestrutura de servidores ativos.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**: Framework declarativo moderno de alta performance.
- **Vite**: Bundler ultra veloz para desenvolvimento local.
- **Tailwind CSS v4**: Utilitários utilitários rápidos para estilização de altíssimo padrão.
- **Lucide React**: Biblioteca de ícones elegantes de alta qualidade.
- **Motion (motion/react)**: Animações de transição leves e fluidas.

---

## 🚀 Como Rodar o Projeto Localmente

Se você baixou este projeto no formato `.ZIP` e deseja executá-lo ou pedir para o **ChatGPT/Claude** fazer alterações, siga o passo a passo abaixo:

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em seu computador (versão 18 ou superior recomendada).

### 1. Instalar as dependências
Abra o terminal na pasta raiz do projeto e execute:
```bash
npm install
```

### 2. Rodar o servidor de desenvolvimento
Inicie o ambiente de desenvolvimento local com:
```bash
npm run dev
```
O Vite iniciará o projeto no endereço padrão: [http://localhost:3000](http://localhost:3000)

### 3. Gerar build de produção
Se desejar gerar a versão estática otimizada para publicação/hospedagem:
```bash
npm run build
```
Os arquivos gerados estarão prontos para deploy na pasta `/dist`.

---

## 🤖 Como Enviar este Projeto para o ChatGPT / Claude

Se você deseja fazer modificações ou expandir o projeto usando IA, compacte esta pasta e anexe o arquivo `.ZIP` na sua conversa com a IA. Você pode usar prompts como:
- *"Adicione um novo ativo à lista de monitoramento no arquivo de tipos ou estados."*
- *"Modifique a taxa de lucro de payout do sinal automático."*
- *"Adicione suporte a múltiplos idiomas no painel de controle."*

O código está estruturado de forma limpa, modular e componentizada para facilitar qualquer edição rápida.
