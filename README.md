SGE-IFB
Sistema de Gestão de Eventos Acadêmicos

O SGE-IFB é uma plataforma desenvolvida em Python para a organização centralizada do calendário institucional do Instituto Federal de Brasília (IFB).
O sistema visa otimizar o fluxo de eventos acadêmicos, permitindo o controle de cronogramas, categorização estratégica, monitoramento de participação e extração de métricas de desempenho organizacional por meio de relatórios integrados.

🚀 Funcionalidades

Painel Administrativo
Interface moderna baseada em Glassmorphism para gestão visual e intuitiva dos eventos.

Filtros Inteligentes
Ordenação e filtragem por categorias:

Acadêmico

Cultural

Esportivo

Validação Flexível de Datas
Suporte a múltiplos formatos de data (com ou sem barras).

Relatórios em Tempo Real
Geração de métricas de participação e totalização de eventos por categoria.

Controle de Presença
Sistema de check-in para acompanhamento da participação em eventos planejados.

🛠️ Tecnologias Utilizadas

Backend: Python, Flask

Frontend: HTML5, CSS3 (Custom Properties e Glassmorphism), JavaScript (Vanilla ES6)

Ícones: Remix Icon

📋 Passo a Passo para Execução

As instruções abaixo descrevem como executar o projeto localmente no Windows, utilizando o PowerShell.

1. Pré-requisitos

Certifique-se de que o Python está instalado em sua máquina:

python --version

2. Instalação do Flask

No PowerShell, execute:

pip install flask

3. Estrutura do Projeto

Verifique se a estrutura de arquivos está organizada da seguinte forma:

SGE-IFB/
│
├── app.py                  # Servidor principal
├── funcoes_eventos.py      # Lógica de validação e manipulação de dados
│
├── templates/
│   └── index.html          # Interface do sistema
│
├── static/
│   └── css/
│       └── style.css       # Estilização do sistema
│
└── print_do_sistema.png    # Imagem demonstrativa

4. Execução do Sistema

No PowerShell, navegue até a pasta raiz do projeto e execute:

python app.py


O terminal exibirá a mensagem:

Running on http://127.0.0.1:5000


Copie esse endereço e cole no navegador para acessar o sistema.

📸 Projeto por Dentro

![Banner do Projeto](./print_do_sistema.png)
