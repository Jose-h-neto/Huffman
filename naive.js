let tabela = {};
let tabelaDecode = {};
let bits = 0;
let binario = "";

function executarCompressao() {
  const texto = document.getElementById("inputText").value;
  const output = document.getElementById("output");
  const stats = document.getElementById("stats");

  if (texto.length === 0) {
    output.textContent = "Digite um texto.";
    return;
  }

  let lista = contarFrequencia(texto);

  ordenarFrequencia(lista);

  bits = calcularBits(lista.length);

  gerarTabela(lista);

  binario = codificar(texto);

  mostrarResultado(texto, lista, output, stats);
}

function contarFrequencia(texto) {
  let freq = {};

  for (let c of texto) {
    if (!freq[c]) freq[c] = 0;
    freq[c]++;
  }

  let lista = [];

  for (let c in freq) {
    lista.push({ char: c, freq: freq[c] });
  }

  return lista;
}

function ordenarFrequencia(lista) {
  for (let i = 0; i < lista.length - 1; i++) {
    for (let j = 0; j < lista.length - i - 1; j++) {
      if (lista[j].freq < lista[j + 1].freq) {
        let temp = lista[j];
        lista[j] = lista[j + 1];
        lista[j + 1] = temp;
      }
    }
  }
}

function calcularBits(qtd) {
  let b = 1;

  while (Math.pow(2, b) < qtd) {
    b++;
  }

  return b;
}

function gerarTabela(lista) {
  tabela = {};
  tabelaDecode = {};

  for (let i = 0; i < lista.length; i++) {
    let bin = i.toString(2);

    while (bin.length < bits) {
      bin = "0" + bin;
    }

    tabela[lista[i].char] = bin;
    tabelaDecode[bin] = lista[i].char;
  }
}

function codificar(texto) {
  let resultado = "";

  for (let c of texto) {
    resultado += tabela[c];
  }

  return resultado;
}

function executarDescompressao() {
  const output = document.getElementById("output");

  if (!binario) {
    output.textContent += "\n\nNada para descomprimir.";
    return;
  }

  let texto = "";

  for (let i = 0; i < binario.length; i += bits) {
    let trecho = binario.slice(i, i + bits);

    texto += tabelaDecode[trecho];
  }

  output.textContent += "\n\nTexto descomprimido:\n" + texto;
}

function mostrarResultado(texto, lista, output, stats) {
  let tabelaTexto = "Tabela de códigos:\n";

  for (let c in tabela) {
    let vis = c === " " ? "[espaco]" : c;

    tabelaTexto += vis + " : " + tabela[c] + "\n";
  }

  output.textContent =
    "Texto original:\n" +
    texto +
    "\n\nBinário comprimido:\n" +
    binario +
    "\n\n" +
    tabelaTexto;

  let original = texto.length * 8;
  let comprimido = texto.length * bits;
  let tabelaBits = lista.length * (8 + bits);
  let total = comprimido + tabelaBits;

  stats.textContent =
    "Caracteres totais: " +
    texto.length +
    "\nCaracteres únicos: " +
    lista.length +
    "\nBits usados: " +
    bits +
    "\n\nTamanho original: " +
    original +
    " bits" +
    "\nDados comprimidos: " +
    comprimido +
    " bits" +
    "\nTabela: " +
    tabelaBits +
    " bits" +
    "\nTotal final: " +
    total +
    " bits";
}
