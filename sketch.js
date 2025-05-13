// Definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  //   jardineiro = new Jardineiro(width/2, height-50);
}

function draw() {
  // Usando map() para ajustar cor de fundo de forma mais controlada;
  let corFundo = lerpColor(
    color(217, 112, 26),
    color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1)
  );
  background(corFundo);
  mostrarInformacoes();
  temperatura += 0.1;
  jardineiro.atualizar();
  jardineiro.mostrar();

  // Verificar se o jogo acabou
  verificarFimDeJogo();

  // Usando map() para aplicar o comportamento de árvores plantadas
  plantas.map((arvore) => arvore.mostrar());
}

// Função para mostrar as informações na tela
function mostrarInformacoes(){
  textSize(26);
  fill(0);
  text("Vamos plantar árvores para reduzir a temperatura?",10,30);
  textSize(14);
  fill('white');
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores plantadas: " + totalArvores, 460, 390);
  text("Para movimentar os personagem use as setas do teclado.", 10, 60);
  text("Para plantar árvores use P ou espaço.", 10, 80);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (totalArvores > temperatura){
    mostrarMensagemDeVitoria();
  } else if (temperatura > 50){
    mostrarMensagemDeDerrota();
  }
}

// Função para atualizar posição do Jardineiro
function atualizar(){
  if (keyIsDown(LEFT_ARROW)){
    this.x -= this.velocidade;
  }
  if (keyIsDown(RIGHT_ARROW)){
    this.x += this.velocidade;
  }
  if (keyIsDown(UP_ARROW)){
    this.y -= this.velocidade;
  }
  if (keyIsDown(DOWN_ARROW)){
    this.y += this.velocidade;
  }
}

// Função para criar e plantar uma árvore
function keyPressed() {
  if (key === ' ' || key === 'p') {
    let arvore = new Arvore(jardineiro.x, jardineiro.y);
    plantas.push(arvore);
    totalArvores++;
    temperatura -= 3;
    if (temperatura <0)
      temperatura = 0
  }
}

