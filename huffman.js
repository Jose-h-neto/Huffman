function executarCompressao() {
  const texto = document.getElementById("inputText").value;
  const output = document.getElementById("output");
  const stats = document.getElementById("stats");

  if (texto.length === 0) {
    output.textContent = "Digite um texto.";
    stats.textContent = "";
    return;
  }

  // ================================
  // 1. CONTAR FREQUÊNCIA
  // ================================

  const freq = {};

  for (let char of texto) {
    if (freq[char]) {
      freq[char]++;
    } else {
      freq[char] = 1;
    }
  }

  // ================================
  // 2. CRIAR NODES
  // ================================

  let nodes = [];

  for (let char in freq) {
    nodes.push({
      char: char,
      freq: freq[char],
      left: null,
      right: null,
    });
  }

  // ================================
  // 3. ORDENAR POR FREQUÊNCIA
  // ================================

  nodes.sort((a, b) => a.freq - b.freq);

  // ================================
  // 4. CONSTRUIR ÁRVORE HUFFMAN
  // ================================

  while (nodes.length > 1) {
    let left = nodes.shift();
    let right = nodes.shift();

    let newNode = {
      char: null,
      freq: left.freq + right.freq,
      left: left,
      right: right,
    };

    nodes.push(newNode);

    nodes.sort((a, b) => a.freq - b.freq);
  }

  const huffmanTree = nodes[0];

  // ================================
  // 5. GERAR CÓDIGOS BINÁRIOS
  // ================================

  const codes = {};

  function gerarCodigos(node, path) {
    if (node.char !== null) {
      codes[node.char] = path;
      return;
    }

    gerarCodigos(node.left, path + "0");
    gerarCodigos(node.right, path + "1");
  }

  gerarCodigos(huffmanTree, "");

  // ================================
  // 6. CODIFICAR TEXTO
  // ================================

  let encoded = "";

  for (let char of texto) {
    encoded += codes[char];
  }

  // ================================
  // 7. CALCULAR TAMANHO DA TABELA
  // ================================

  let tableBits = 0;

  for (let char in codes) {
    tableBits += 8 + codes[char].length;
  }

  // ================================
  // 8. CRIAR TABELA DE FREQUÊNCIA
  // ================================

  let freqTable = "Frequência dos caracteres:\n\n";

  for (let char in freq) {
    let c = char === " " ? "(espaço)" : char;

    freqTable += c + " : " + freq[char] + "\n";
  }

  // ================================
  // 9. TABELA DE CÓDIGOS
  // ================================

  let codeTable = "\nTabela de códigos Huffman:\n\n";

  for (let char in codes) {
    let c = char === " " ? "(espaço)" : char;

    codeTable += c + " : " + codes[char] + "\n";
  }

  // ================================
  // SAÍDA
  // ================================

  output.textContent =
    freqTable + codeTable + "\nTexto comprimido:\n\n" + encoded;

  // ================================
  // ESTATÍSTICAS
  // ================================

  const originalBits = texto.length * 8;
  const compressedBits = encoded.length;
  const totalCompressed = compressedBits + tableBits;

  stats.textContent =
    "Tamanho original: " +
    originalBits +
    " bits\n" +
    "Tamanho comprimido (dados): " +
    compressedBits +
    " bits\n" +
    "Tabela de encoding: " +
    tableBits +
    " bits\n" +
    "Total transmitido: " +
    totalCompressed +
    " bits\n" +
    "Caracteres únicos: " +
    Object.keys(freq).length;
}
