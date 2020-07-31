console.log('[StarDev] Flappy Bird');

const sprites = new Image();
sprites.src = './assets/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  sX: 390,
  sY: 0,
  w: 275,
  h: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#60b9f5'
    contexto.fillRect(0, 0, canvas.width, canvas.height)
    contexto.drawImage(
      sprites,
      planoDeFundo.sX, planoDeFundo.sY, // Sprite X, Sprite Y
      planoDeFundo.w, planoDeFundo.h, // Tamanho do recorte na sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.w, planoDeFundo.h,
    )
    contexto.drawImage(
      sprites,
      planoDeFundo.sX, planoDeFundo.sY, // Sprite X, Sprite Y
      planoDeFundo.w, planoDeFundo.h, // Tamanho do recorte na sprite
      (planoDeFundo.x + planoDeFundo.w), planoDeFundo.y,
      planoDeFundo.w, planoDeFundo.h,
    )
  }
}

const chao = {
  sX: 0,
  sY: 610,
  w: 224,
  h: 112,
  x: 0,
  y: canvas.height - 112, // o canvas - a h do objeto
  desenha() {
    contexto.drawImage(
      sprites,
      chao.sX, chao.sY, // Sprite X, Sprite Y
      chao.w, chao.h, // Tamanho do recorte na sprite
      chao.x, chao.y,
      chao.w, chao.h,
    )
    contexto.drawImage(
      sprites,
      chao.sX, chao.sY, // Sprite X, Sprite Y
      chao.w, chao.h, // Tamanho do recorte na sprite
      (chao.x + chao.w), chao.y,
      chao.w, chao.h,
    )
  }
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.h
  const chaoY = chao.y

  if (flappyBirdY >= chaoY) {
    return true
  }
  return false
}

function criaFlappyBird() {
  const flappyBird = {
    sX: 0,
    sY: 0,
    w: 33,
    h: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('devo pular');
      flappyBird.velocidade = -flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(flappyBird, chao)) {
        console.log('fez colisão');

        mudaParaTela(Telas.INICIO)

        return
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    desenha() {
      contexto.drawImage(
        sprites,
        flappyBird.sX, flappyBird.sY, // Sprite X, Sprite Y
        flappyBird.w, flappyBird.h, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.w, flappyBird.h,
      )
    }
  }
  return flappyBird
}


const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50, // o canvas - a algura do objeto
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY, // Sprite X, Sprite Y
      mensagemGetReady.w, mensagemGetReady.h, // Tamanho do recorte na sprite
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h,
    )
  }
}

//
//Telas
//

let globais = {}
let TelaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if (TelaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird()
    },
    desenha() {
      planoDeFundo.desenha()
      chao.desenha()
      globais.flappyBird.desenha()
      mensagemGetReady.desenha()
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {

    }
  }
}

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha()
    chao.desenha()
    globais.flappyBird.desenha()
  },
  click() {
    globais.flappyBird.pula()
  },
  atualiza() {
    globais.flappyBird.atualiza()
  }
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)
loop()

//10:53 - aula 3
// não encontrei o erro