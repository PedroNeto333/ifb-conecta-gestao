async function carregarEventos() {
    try {
        const res = await fetch('/api/eventos');
        const eventos = await res.json();
        const lista = document.getElementById('eventos-lista');
        
        lista.innerHTML = eventos.map((ev, index) => `
            <div class="event-card ${ev.categoria}" style="animation-delay: ${index * 0.1}s">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span class="badge">${ev.categoria}</span>
                    <button onclick="deletarEvento(${ev.id})" style="background:none; border:none; color:#e74c3c; cursor:pointer;">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                <h3 style="margin: 10px 0 5px 0">${ev.nome}</h3>
                <p style="font-size: 0.9rem; opacity: 0.7;">
                    <i class="ri-map-pin-2-line"></i> ${ev.local}
                </p>
                <p style="font-size: 0.9rem; opacity: 0.7;">
                    <i class="ri-calendar-event-line"></i> ${ev.data}
                </p>
            </div>
        `).join('');
    } catch (e) {
        console.error("Erro ao carregar:", e);
    }
}

async function addEvento() {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const local = document.getElementById('local').value;

    if(!nome || !data) return alert("Preencha os campos obrigatórios!");

    const res = await fetch('/api/eventos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome, data, categoria, local })
    });

    if(res.ok) {
        // Limpa campos
        document.getElementById('nome').value = '';
        document.getElementById('data').value = '';
        carregarEventos();
    } else {
        alert("Erro ao validar data!");
    }
}

async function deletarEvento(id) {
    // Aqui você chamaria funcoes.deletar_evento via API
    console.log("Deletando ID:", id);
    // Implementar rota DELETE no Flask se desejar
}

carregarEventos();

// Função para deletar com animação
async function deletarEvento(id) {
    if(!confirm("Deseja realmente excluir este evento?")) return;

    const res = await fetch(`/api/eventos/${id}`, { method: 'DELETE' });
    if(res.ok) {
        carregarEventos(); // Recarrega a lista
    }
}

// Função para exibir relatório em um modal ou alerta moderno
async function gerarRelatorio() {
    const res = await fetch('/api/relatorio');
    const data = await res.json();
    
    let resumo = `Total de Eventos: ${data.total}\n\n`;
    for (const [cat, qtd] of Object.entries(data.por_categoria)) {
        resumo += `• ${cat}: ${qtd}\n`;
    }
    
    alert("📊 RELATÓRIO IFCONECTA\n\n" + resumo);
}

let todosEventos = [];

async function carregarEventos(filtro = 'Todos') {
    // 1. Atualizar o visual dos botões
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === filtro || (filtro === 'Todos' && btn.innerText === 'Todos')) {
            btn.classList.add('active');
        }
    });

    // 2. Buscar dados do Python
    const res = await fetch('/api/eventos');
    let eventos = await res.json();

    // 3. Ordenar: Primeiro os Não Participados, depois por Data
    eventos.sort((a, b) => a.participado - b.participado);

    // 4. Filtrar por Categoria
    const filtrados = filtro === 'Todos' 
        ? eventos 
        : eventos.filter(ev => ev.categoria === filtro);

    // 5. Renderizar na tela
    const lista = document.getElementById('eventos-lista');
    lista.innerHTML = filtrados.map(ev => `
        <div class="event-card ${ev.categoria} ${ev.participado ? 'participado' : ''}">
            <div class="card-header">
                <span class="badge">${ev.categoria}</span>
                <button onclick="deletarEvento(${ev.id})" class="delete-btn">×</button>
            </div>
            <h3>${ev.nome}</h3>
            <p><i class="ri-calendar-line"></i> ${ev.data}</p>
            <button onclick="checkEvento(${ev.id})" class="btn-check">
                ${ev.participado ? 'Participado' : 'Marcar Presença'}
            </button>
        </div>
    `).join('');
}

function renderizar(filtro) {
    const lista = document.getElementById('eventos-lista');
    const filtrados = filtro === 'Todos' 
        ? todosEventos 
        : todosEventos.filter(ev => ev.categoria === filtro);

    lista.innerHTML = filtrados.map(ev => `
        <div class="event-card ${ev.categoria} ${ev.participado ? 'participado' : ''}">
            <div class="card-header">
                <span class="badge">${ev.categoria}</span>
                <div class="actions">
                    <button onclick="checkEvento(${ev.id})"><i class="ri-check-line"></i></button>
                    <button onclick="deletarEvento(${ev.id})"><i class="ri-delete-bin-line"></i></button>
                </div>
            </div>
            <h3>${ev.nome}</h3>
            <p><i class="ri-calendar-line"></i> ${ev.data}</p>
        </div>
    `).join('');
}

async function checkEvento(id) {
    await fetch(`/api/eventos/${id}/check`, { method: 'PATCH' });
    carregarEventos(); // Atualiza a interface
}

function renderizarCard(ev) {
    return `
        <div class="event-card ${ev.participado ? 'participado' : ''}">
            <div class="card-header">
                <span class="badge">${ev.categoria}</span>
                <button onclick="deletarEvento(${ev.id})" class="delete-btn">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            <h3>${ev.nome}</h3>
            <p><i class="ri-map-pin-line"></i> ${ev.local}</p>
            <p><i class="ri-calendar-line"></i> ${ev.data}</p>
            <button onclick="alternarPresenca(${ev.id})" class="btn-check">
                ${ev.participado ? '<i class="ri-check-line"></i> Participado' : 'Marcar Presença'}
            </button>
        </div>
    `;
}

async function gerarRelatorio() {
    const res = await fetch('/api/relatorio');
    const dados = await res.json();
    
    let mensagem = `📊 Relatório Geral:\n\nTotal de Eventos: ${dados.total}\n`;
    
    for (const [cat, qtd] of Object.entries(dados.por_categoria)) {
        mensagem += `• ${cat}: ${qtd}\n`;
    }
    
    if (dados.total === 0) {
        alert("Nenhum evento cadastrado para gerar relatório.");
    } else {
        alert(mensagem);
    }
}