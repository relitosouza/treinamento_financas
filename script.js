// ==========================================================
// COLE SUA URL AQUI
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZreiAf6-TvqZulPZGNT5lxNNPkR6nlCTLonu-aKa7wdpo2W959zi2IhOllZWzkacH/exec'; 
// ==========================================================

// CONTEÚDO DAS APOSTILAS
const studyMaterials = {
    'planejamento': `
        <h2 style="text-align:center; color:#003366;">📘 Resumo: Planejamento e Princípios</h2>
        <h3>1. A Tríade Orçamentária</h3>
        <p>No Brasil, o orçamento é definido por três leis de iniciativa do Poder Executivo:</p>
        <ul>
            <li><strong>PPA (Plano Plurianual):</strong> Planejamento estratégico de médio prazo. Define diretrizes, objetivos e metas para <strong>4 anos</strong>.</li>
            <li><strong>LDO (Lei de Diretrizes Orçamentárias):</strong> Elo entre o planejamento e a execução. Define metas e prioridades para o ano seguinte e orienta a LOA.</li>
            <li><strong>LOA (Lei Orçamentária Anual):</strong> O orçamento propriamente dito. Estima a receita e fixa a despesa para 1 ano.</li>
        </ul>
        <h3>2. Princípios Orçamentários</h3>
        <ul>
            <li><strong>Unidade:</strong> O orçamento deve ser um só para cada ente.</li>
            <li><strong>Universalidade:</strong> Todas as receitas e despesas devem constar no orçamento.</li>
            <li><strong>Anualidade:</strong> O orçamento vale para o exercício financeiro (1 jan a 31 dez).</li>
            <li><strong>Exclusividade:</strong> A LOA não conterá "matéria estranha", exceto créditos suplementares e operações de crédito.</li>
        </ul>`,
    
    'orcamento': `
        <h2 style="text-align:center; color:#003366;">📙 Resumo: Execução Orçamentária</h2>
        <h3>1. Estágios da Despesa</h3>
        <ul>
            <li><strong>Fixação:</strong> Na aprovação da lei.</li>
            <li><strong>Empenho:</strong> Reserva do recurso. Cria a obrigação para o Estado. (Vedado despesa sem prévio empenho).</li>
            <li><strong>Liquidação:</strong> Verificação do direito do credor (conferência da entrega do bem/serviço).</li>
            <li><strong>Pagamento:</strong> Entrega do numerário.</li>
        </ul>
        <h3>2. Tipos de Empenho</h3>
        <ul>
            <li><strong>Ordinário:</strong> Valor fixo e pagamento único.</li>
            <li><strong>Global:</strong> Valor conhecido, pagamento parcelado (ex: aluguel).</li>
            <li><strong>Estimativo:</strong> Valor incerto (ex: conta de luz).</li>
        </ul>
        <h3>3. Restos a Pagar</h3>
        <p>Despesas empenhadas mas não pagas até 31/dez.</p>
        <ul>
            <li><strong>Processados:</strong> Já liquidados (serviço feito).</li>
            <li><strong>Não Processados:</strong> Apenas empenhados.</li>
        </ul>`,

    'contabilidade': `
        <h2 style="text-align:center; color:#003366;">📗 Resumo: Contabilidade Pública</h2>
        <h3>1. Regimes Contábeis</h3>
        <ul>
            <li><strong>Orçamentário:</strong> Misto (Caixa para Receita, Competência para Despesa).</li>
            <li><strong>Patrimonial:</strong> Competência total (reconhece VPA e VPD pelo fato gerador).</li>
        </ul>
        <h3>2. Demonstrações (MCASP)</h3>
        <ul>
            <li><strong>Balanço Orçamentário:</strong> Previsto vs. Executado.</li>
            <li><strong>Balanço Patrimonial:</strong> Ativos e Passivos (Financeiros e Permanentes).</li>
            <li><strong>Superávit Financeiro:</strong> Ativo Financeiro (-) Passivo Financeiro.</li>
        </ul>
        <h3>3. LRF e Dívida</h3>
        <ul>
            <li><strong>Regra de Ouro:</strong> Proibido se endividar (Operação de Crédito) para pagar despesa corrente, exceto investimento.</li>
            <li><strong>Dívida Flutuante:</strong> Curto prazo (ex: Restos a Pagar).</li>
            <li><strong>Dívida Fundada:</strong> Longo prazo (exige lei).</li>
        </ul>`,
        
    'aleatorio': `
        <h2 style="text-align:center; color:#003366;">🎲 Resumo Geral (Mix)</h2>
        <p>Você realizou um teste com tópicos mistos. Abaixo, os pontos chave de cada área:</p>
        <h4>Planejamento</h4>
        <p>Lembre-se da hierarquia: PPA (4 anos) > LDO (Metas Anuais) > LOA (Execução).</p>
        <h4>Execução</h4>
        <p>A ordem obrigatória é: Empenho > Liquidação > Pagamento. Jamais pague sem liquidar!</p>
        <h4>Contabilidade</h4>
        <p>O foco atual é o enfoque Patrimonial (reconhecer depreciação, ativos e passivos independente do orçamento).</p>
        <p><em>Para um estudo mais aprofundado, sugerimos realizar os módulos específicos individualmente.</em></p>`
};

let allQuestionsData = [];
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let studentName = "";
let selectedModule = "";
let mistakes = new Set();

const topicGroups = {
    'planejamento': ['Planejamento', 'Ciclo Orçamentário', 'Princípios', 'LDO', 'PPA', 'LOA'],
    'orcamento': ['Empenho', 'Liquidação', 'Pagamento', 'Despesa', 'Receita', 'Classificação', 'Créditos', 'Dívida', 'Suprimento'],
    'contabilidade': ['Contabilidade', 'PCASP', 'Demonstrações', 'Patrimônio', 'LRF', 'Balanço']
};

window.onload = function() { fetchQuestions(); };

function fetchQuestions() {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('COLE_SUA_URL')) {
        alert("Erro: URL do Script não configurada."); return;
    }
    fetch(GOOGLE_SCRIPT_URL).then(r => r.json()).then(data => {
        allQuestionsData = data;
        if(allQuestionsData.length > 0) {
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('menu-screen').classList.remove('hidden');
            document.getElementById('subtitle').innerText = "Selecione um módulo";
        } else { alert("A planilha está vazia."); }
    }).catch(e => { document.getElementById('loading-screen').innerHTML = "<p style='color:red'>Erro de conexão.</p>"; });
}

function selectCategory(category) {
    selectedModule = category;
    let filteredQuestions = [];

    if (category === 'aleatorio') {
        filteredQuestions = [...allQuestionsData];
        document.getElementById('selected-theme-display').innerText = "Aleatório Geral";
    } else {
        const allowedTopics = topicGroups[category];
        filteredQuestions = allQuestionsData.filter(q => {
            return allowedTopics.some(t => q.topic && q.topic.includes(t));
        });
        const names = {'planejamento': 'Planejamento', 'orcamento': 'Orçamento e Pagamento', 'contabilidade': 'Contabilidade'};
        document.getElementById('selected-theme-display').innerText = names[category];
    }

    if (filteredQuestions.length === 0) {
        alert("Não há perguntas suficientes para este tema."); return;
    }

    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }

    currentQuizQuestions = filteredQuestions.slice(0, 10);
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('intro-screen').classList.remove('hidden');
    document.getElementById('subtitle').innerText = "Identificação";
}

function startQuiz() {
    const nameInput = document.getElementById('student-name');
    if (nameInput.value.trim() === "") { alert("Digite seu nome."); return; }
    studentName = nameInput.value;
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('subtitle').innerText = "Em progresso...";
    document.getElementById('total-q-num').innerText = currentQuizQuestions.length;
    loadQuestion();
}

function loadQuestion() {
    const currentData = currentQuizQuestions[currentQuestionIndex];
    document.getElementById('current-q-num').innerText = currentQuestionIndex + 1;
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('question-text').innerText = currentData.q;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; 
    currentData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(idx, btn) {
    const data = currentQuizQuestions[currentQuestionIndex];
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    const correct = parseInt(data.answer);
    if (idx === correct) { btn.classList.add('correct'); score++; }
    else { 
        btn.classList.add('incorrect'); 
        document.querySelectorAll('.option-btn')[correct].classList.add('correct');
        if(data.topic) mistakes.add(data.topic);
    }
    document.getElementById('feedback-text').innerText = data.rationale;
    document.getElementById('feedback-container').classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizQuestions.length) loadQuestion();
    else showResults();
}

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('subtitle').innerText = "Concluído";
    const pct = Math.round((score / currentQuizQuestions.length) * 100);
    document.getElementById('result-name').innerText = studentName;
    document.getElementById('result-module').innerText = document.getElementById('selected-theme-display').innerText;
    document.getElementById('score').innerText = pct;
    
    let msg = pct >= 70 ? "<p style='color:#28a745'><strong>Aprovado!</strong></p>" : "<p style='color:#dc3545'><strong>Continue estudando.</strong></p>";
    if (mistakes.size > 0) msg += `<div style="text-align:left; background:#fff3cd; padding:10px; border-radius:5px;"><strong>Revisar:</strong> ${Array.from(mistakes).join(", ")}</div>`;
    document.getElementById('result-message').innerHTML = msg;

    sendResults(studentName, score, pct + "%", Array.from(mistakes).join(", "), selectedModule);
}

// --- LÓGICA DA APOSTILA ---
function openStudyGuide() {
    const content = studyMaterials[selectedModule] || studyMaterials['aleatorio'];
    document.getElementById('guide-content').innerHTML = content;
    document.getElementById('study-modal').classList.remove('hidden');
}

function closeStudyGuide() {
    document.getElementById('study-modal').classList.add('hidden');
}
// --------------------------

function sendResults(nome, acertos, percentual, topicos, modulo) {
    const loadingMsg = document.getElementById('saving-msg');
    const data = { nome: nome, acertos: acertos, percentual: percentual, topicos: topicos, modulo: modulo };
    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(data) })
    .then(() => { loadingMsg.innerText = "✅ Resultados salvos!"; loadingMsg.style.color = "green"; })
    .catch(() => { loadingMsg.innerText = "⚠️ Erro ao salvar."; });
}
