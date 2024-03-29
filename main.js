// CAPTURAR FORMULÁRIO
const form = document.getElementById("formulario");

// ARMAZENAGEM DE DADOS
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota minima: '));

// VARIAVEL PARA ALOCAÇÃO DOS EMOJIS
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji festejando"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado"/>';

// VARIAVEL VAZIA PARA COLOCAÇÃO DO CONTEÚDO
linhas = "";

// RESETAR PADRAO DE EVENTO SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // CHAMANDO AS FUNÇÕES
  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha(){
    // CAPTURAR INPUTS
    const inputNomeAtividade = document.getElementById("nomeAtividade");
    const inputNotaAtividade = document.getElementById("notaAtividade");

    // VERIFICANDO SE JA EXISTE ATIVIDADE NO ARRAY
    if (atividades.includes(inputNomeAtividade.value)){
      alert(`A atividade ${inputNomeAtividade.value} já esta inserida no sitema`);
    }else{
      // ADICIONANDO DADOS AOS ARRAYS
      atividades.push(inputNomeAtividade.value);
      notas.push(parseFloat(inputNotaAtividade.value));
    
      //   ADICIONAR LINHA NA TABELA
      let linha = "<tr>";
      //   ADICIONA COLUNA NO CAMPO NOME ATIVIDADE
      linha += `<td>${inputNomeAtividade.value}</td>`;
      //   ADICIONA COLUNA NO CAMPO NOTA ATIVIDADE
      linha += `<td>${inputNotaAtividade.value}</td>`;
      //   ADICONA O EMOJI DE ACORDO COM A NOTA DA ATIVIDADE
      linha += `<td>${
        inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
      //   FECHAMENTO DA LINHA NA TABELA
      linha += "</tr>";
    
      //   ADIÇÃO DE NOVAS LINHAS ABAIXO
      linhas += linha;
    }

    // RESET CAMPOS NO FORMULÁRIO
    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";
}

function atualizaTabela(){
      // CAPTURAR CORPO DA TABELA
      const corpoTabela = document.querySelector("tbody");
      // INSERÇÃO DO CONTEÚDO NO CORPO DA TABELA
      corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
  const mediaFinal = calculaMediaFinal();

  // RECUPERANDO E MODIFICANDO O ELEMENTO HTML
  document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
  document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
  let somaNotas = 0;
  for (let i = 0; i < notas.length; i++){
    somaNotas+= notas[i];
  }

  return somaNotas / notas.length;
}