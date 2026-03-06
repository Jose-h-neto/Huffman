let indiceAtual = 0;
const imagens = document.querySelectorAll(".carrossel img");

function mostrarImagem() {
  for (let i = 0; i < imagens.length; i++) {
    imagens[i].style.display = "none";
  }

  imagens[indiceAtual].style.display = "block";
}

function proximo() {
  indiceAtual++;

  if (indiceAtual >= imagens.length) {
    indiceAtual = 0;
  }

  mostrarImagem();
}

function anterior() {
  indiceAtual--;

  if (indiceAtual < 0) {
    indiceAtual = imagens.length - 1;
  }

  mostrarImagem();
}

/* detectar teclas do teclado */
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    proximo();
  }

  if (event.key === "ArrowLeft") {
    anterior();
  }
});

/* inicia mostrando a primeira imagem */
mostrarImagem();
