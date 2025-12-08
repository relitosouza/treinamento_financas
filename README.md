# 🏛️ Quiz Interativo de Gestão Pública e AFO

Uma aplicação web interativa para treinamento e avaliação de conhecimentos em Administração Financeira e Orçamentária (AFO), Contabilidade Pública e Planejamento Governamental.

O sistema utiliza **Google Sheets** como Banco de Dados (CMS), permitindo que administradores adicionem perguntas e recebam as notas dos alunos sem necessidade de servidores complexos ou banco de dados SQL.

## ✨ Funcionalidades

* **📚 Sistema Modular:** O aluno escolhe o tema que deseja treinar:
    * Planejamento (PPA, LDO, LOA)
    * Execução Orçamentária (Empenho, Liquidação, Pagamento)
    * Contabilidade Pública (PCASP, LRF, Demonstrações)
    * Modo Aleatório (Mistura de todos os temas)
* **🔄 Perguntas Dinâmicas:** O sistema baixa todas as perguntas da planilha e sorteia 10 aleatórias a cada acesso, garantindo testes sempre diferentes.
* **✅ Feedback Imediato:** Explicação (rationale) exibida logo após responder cada questão.
* **📊 Integração com Google Sheets:**
    * **Leitura (`doGet`):** As perguntas são gerenciadas numa planilha.
    * **Escrita (`doPost`):** Os resultados (Nome, Nota, Módulo e Erros) são salvos automaticamente na planilha.
* **📖 Apostilas Integradas:** Ao final do teste, o aluno pode ler um resumo (mini-apostila) específico sobre o módulo escolhido.
* **🖨️ Impressão:** Opção para imprimir o resultado ou o material de estudo.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3 (Responsivo), Vanilla JavaScript (ES6+).
* **Backend / Database:** Google Apps Script & Google Sheets API.
* **Comunicação:** Fetch API (JSON).

## 🚀 Como Configurar e Usar

Para rodar este projeto, você precisará de uma conta Google para hospedar a planilha e o script.

### Passo 1: Preparar a Planilha Google
1.  Crie uma nova Planilha no Google Sheets.
2.  **Aba 1 (Resultados):** Renomeie para `Resultados` (ou deixe Página1). Esta aba receberá os dados dos alunos.
3.  **Aba 2 (Perguntas):** Crie uma nova aba e renomeie OBRIGATORIAMENTE para `Perguntas`.
4.  Na aba `Perguntas`, crie a seguinte estrutura na **Linha 1**:
    * `A`: Pergunta
    * `B`: Opção 1
    * `C`: Opção 2
    * `D`: Opção 3
    * `E`: Opção 4
    * `F`: Resposta Correta (número de 1 a 4)
    * `G`: Tópico (ex: Planejamento, Empenho, Contabilidade)
    * `H`: Explicação/Rationale

### Passo 2: Configurar o Google Apps Script
1.  Na planilha, vá em `Extensões` > `Apps Script`.
2.  Apague o código existente e cole o código do arquivo `code.gs` (disponível abaixo ou na documentação do projeto).
3.  O script deve conter as funções `doGet` (para ler perguntas) e `doPost` (para salvar notas).
4.  Clique em **Salvar**.

### Passo 3: Implantar (Deploy)
1.  Clique no botão azul **Implantar** > **Nova implantação**.
2.  Selecione o tipo: **App da Web**.
3.  Configure as permissões (MUITO IMPORTANTE):
    * **Executar como:** `Eu` (seu email).
    * **Quem pode acessar:** `Qualquer pessoa` (Anyone).
4.  Clique em Implantar e copie a **URL do App da Web** gerada.

### Passo 4: Configurar o Frontend
1.  Clone este repositório ou baixe o arquivo `index.html`.
2.  Abra o arquivo `index.html` em um editor de código.
3.  Localize a variável `GOOGLE_SCRIPT_URL` (geralmente nas primeiras linhas do script):
    ```javascript
    const GOOGLE_SCRIPT_URL = 'COLE_SUA_URL_AQUI';
    ```
4.  Cole a URL que você copiou no Passo 3.
5.  Abra o arquivo `index.html` no navegador.

## 📂 Estrutura de Tópicos
O sistema agrupa os tópicos da planilha nos seguintes módulos automaticamente:

* **Planejamento:** Tópicos contendo "Planejamento", "PPA", "LDO", "LOA", "Princípios".
* **Orçamento:** Tópicos contendo "Empenho", "Liquidação", "Pagamento", "Receita", "Despesa", "Créditos".
* **Contabilidade:** Tópicos contendo "Contabilidade", "Balanço", "Patrimônio", "LRF", "PCASP".

## 📄 Código do Apps Script (`code.gs`)

Caso precise restaurar o script do Google:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.nome, data.acertos, data.percentual, data.topicos, data.modulo]);
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'sucesso' })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'erro', 'error': e })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Perguntas');
  var data = sheet.getDataRange().getValues();
  var questions = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if(row[0] !== "" && row[0] != null) {
      questions.push({
        q: row[0], options: [row[1], row[2], row[3], row[4]], 
        answer: row[5] - 1, topic: row[6], rationale: row[7]
      });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(questions)).setMimeType(ContentService.MimeType.JSON);
}
