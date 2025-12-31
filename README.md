SGE-IFB: Sistema de Gestão de Eventos Acadêmicos
Plataforma desenvolvida em Python para a organização centralizada do calendário institucional do IFB. O sistema otimiza o fluxo de eventos acadêmicos, permitindo o controle de cronogramas, categorização estratégica, monitoramento de participação e extração de métricas de desempenho organizacional através de relatórios integrados.

🚀 Funcionalidades
Painel Administrativo: Interface moderna em Glassmorphism para gestão de eventos.

Filtros Inteligentes: Ordenação e filtragem por categorias (Acadêmico, Cultural, Esportivo).

Validação Flexível: Suporte a múltiplos formatos de data (com ou sem barras).

Relatórios em Tempo Real: Métricas de participação e totalização por categoria.

Controle de Presença: Sistema de check-in para eventos planejados.

🛠️ Tecnologias Utilizadas
Backend: Python e Flask.

Frontend: HTML5, CSS3 (Custom Properties & Glassmorphism), JavaScript (Vanilla ES6).

Ícones: Remix Icon.

📋 Passo a Passo para Execução
Siga as instruções abaixo para rodar o projeto localmente no seu Windows utilizando o PowerShell.

1. Pré-requisitos
Certifique-se de ter o Python instalado. Você pode verificar digitando no PowerShell:

PowerShell

python --version
2. Instalação do Flask
Abra o PowerShell e instale a biblioteca necessária:

PowerShell

pip install flask
3. Preparação dos Arquivos
Certifique-se de que a estrutura de pastas está correta:

app.py (servidor principal)

funcoes_eventos.py (lógica de validação e dados)

/templates/index.html (interface)

/static/css/style.css (estilização)

4. Execução do Sistema
Navegue até a pasta do projeto no PowerShell e execute o comando de execução direta:

PowerShell

python app.py
Após o comando, o terminal exibirá: * Running on http://127.0.0.1:5000

Basta copiar esse endereço e colar no seu navegador.
