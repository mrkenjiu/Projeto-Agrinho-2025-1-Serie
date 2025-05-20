// Definindo variáveis globais
let jardineiro;
let arvores = [];
let temperatura = 10;
let totalArvores = 0;
let gameOver = false; // Variável para controlar o fim do jogo
let imgArvore; // Variável para armazenar a imagem da árvore
let imgJardineiro; // Variável para armazenar a imagem do jardineiro

function preload() {
  // Carrega a imagem da árvore
  imgArvore = loadImage("image/tree2.png"); // Substitua pelo caminho da sua imagem
  // Carrega a imagem do jardineiro
  imgJardineiro = loadImage("image/gardener.png"); // Substitua pelo caminho da sua imagem
}

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  if (!gameOver) { // Verifica se o jogo não acabou
    // Usando map() para ajustar cor de fundo de forma mais controlada;
    let corFundo = lerpColor(
      color(217, 112, 26),
      color(219, 239, 208),
      map(totalArvores, 0, 100, 0, 1)
    );
    background(corFundo);
    mostrarInformacoes();
    atualizarTemperatura(); // Atualiza a temperatura
    jardineiro.atualizar();
    jardineiro.mostrar();

    // Usando map() para aplicar o comportamento de árvores plantadas
    arvores.map((arvore) => arvore.mostrar());

    // Verificar se o jogo acabou
    verificarFimDeJogo();
  }
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(26);
  fill(0);
  text("Vamos plantar árvores para reduzir a temperatura?", 10, 30);
  textSize(14);
  fill('white');
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores plantadas: " + totalArvores, 460, 390);
  text("Para movimentar os personagem use as setas do teclado.", 10, 60);
  text("Para plantar árvores use P ou espaço.", 10, 80);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagemDeVitoria();
    gameOver = true; // Define o jogo como terminado
  } else if (temperatura > 50) {
    mostrarMensagemDeDerrota();
    gameOver = true; // Define o jogo como terminado
  }
}

// Função para mostrar mensagem de vitória
function mostrarMensagemDeVitoria() {
  background(0, 255, 0); // Fundo verde para vitória
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Você venceu! A Terra está salva!", width / 2, height / 2);
}

// Função para mostrar mensagem de derrota
function mostrarMensagemDeDerrota() {
  background(255, 0, 0); // Fundo vermelho para derrota
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text("Você perdeu! A Terra está condenada!", width / 2, height / 2);
}

// Função para atualizar a temperatura
function atualizarTemperatura() {
  temperatura += 0.1; // Aumento gradual da temperatura
}

// Classe para representar o jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 5; // Velocidade do jardineiro
    this.tamanho = 100; // Aumenta o tamanho para melhor visualização
    this.img = imgJardineiro; // Armazena a imagem do jardineiro
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }
  }

  mostrar() {
    // Se a imagem do jardineiro estiver carregada, exibe a imagem
    if (this.img) {
      image(this.img, this.x - this.tamanho / 2, this.y - this.tamanho, this.tamanho, this.tamanho);
    }
    // Caso contrário, desenha um jardineiro mais interessante
    else {
      fill(0, 0, 255); // Azul
      // Corpo do jardineiro
      ellipse(this.x, this.y, this.tamanho, this.tamanho * 1.5);
      // Cabeça do jardineiro
      ellipse(this.x, this.y - this.tamanho * 0.75, this.tamanho * 0.7, this.tamanho * 0.7);
      // Braços do jardineiro
      line(this.x - this.tamanho * 0.5, this.y, this.x + this.tamanho * 0.5, this.y);
      // Pernas do jardineiro
      line(this.x - this.tamanho * 0.3, this.y + this.tamanho * 0.75, this.x, this.y + this.tamanho);
      line(this.x + this.tamanho * 0.3, this.y + this.tamanho * 0.75, this.x, this.y + this.tamanho);
    }
  }
}

// Classe para representar uma árvore
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 100; // Aumenta o tamanho da árvore
    this.cor = color(34, 139, 34); // Verde escuro
    this.img = imgArvore; // Armazena a imagem da árvore
  }

  mostrar() {
    // Se a imagem da árvore estiver carregada, exibe a imagem
    if (this.img) {
      image(this.img, this.x - this.tamanho / 2, this.y - this.tamanho, this.tamanho, this.tamanho);
    }
    // Caso contrário, desenha uma árvore mais estilizada
    else {
      fill(this.cor);
      // Tronco da árvore
      rect(this.x - this.tamanho * 0.1, this.y - this.tamanho * 0.2, this.tamanho * 0.2, this.tamanho * 0.6);
      // Copa da árvore
      triangle(
        this.x,
        this.y - this.tamanho,
        this.x - this.tamanho * 0.7,
        this.y - this.tamanho * 0.3,
        this.x + this.tamanho * 0.7,
        this.y - this.tamanho * 0.3
      );
      ellipse(this.x, this.y - this.tamanho * 0.5, this.tamanho * 1.2, this.tamanho * 0.8);
    }
  }
}

// Função para criar e plantar uma árvore
function keyPressed() {
  if (key === ' ' || key === 'p' || key === 'P') { // Permite 'p' ou 'P'
    if (!gameOver) { // Verifica se o jogo não acabou antes de plantar
      let arvore = new Arvore(jardineiro.x, jardineiro.y);
      arvores.push(arvore);
      totalArvores++;
      temperatura -= 3;
      if (temperatura < 0) {
        temperatura = 0;
      }
    }
  }
}