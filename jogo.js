
console.log('[StarDev] Flappy Bird')

let frames = 0
const somHit = new Audio()
somHit.src = './efeitos/hit.wav'

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    )

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    )
  },
}

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movChao = 1
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movChao

      chao.x = movimentacao % repeteEm

      // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]', repeteEm);
      // console.log('[movimentação]', movimentacao);
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      )

      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      )
    },
  }
  return chao
}


function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura

  if (flappyBirdY >= chao.y) {
    return true
  }
  return false
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('DEVO PULAR');
      flappyBird.velocidade = - flappyBird.pulo
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(flappyBird, globais.chao)) {
        console.log('COLISÃO');
        somHit.play()

        setTimeout(() => {
          mudaParaTela(Telas.INICIO)
        }, 500)
        return
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },

    movimentos: [
      { spriteX: 0, spriteY: 0 }, //asa para cima
      { spriteX: 0, spriteY: 26 }, //asa no meio
      { spriteX: 0, spriteY: 52 } //asa para baixo
    ],

    frameAtual: 0,
    atualizaFrameAtual() {
      const intervaloFrames = 10
      const passouIntervalo = frames % intervaloFrames === 0

      if (passouIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual
        const baseRepeticao = flappyBird.movimentos.length
        flappyBird.frameAtual = incremento % baseRepeticao
      }

    },

    desenha() {
      flappyBird.atualizaFrameAtual()
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      )
    }
  }
  return flappyBird
}



/// [mensagemGetReady]
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    )
  }
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    
    desenha(){
      const yRandom = -150
      const espacamento = 90

      // [Cano do Céu]
      const canoCeuX = 220
      const canoCeuY = 0 + yRandom

      contexto.drawImage(
        sprites, 
        canos.ceu.spriteX, canos.ceu.spriteY,
        canos.largura, canos.altura,
        canoCeuX, canoCeuY,
        canos.largura, canos.altura,
      )
      // [Cano do Chão]
      const canoChaoX = 220
      const canoChaoY = canos.altura + espacamento + yRandom

      contexto.drawImage(
        sprites, 
        canos.chao.spriteX, canos.chao.spriteY,
        canos.largura, canos.altura,
        canoChaoX, canoChaoY,
        canos.largura, canos.altura,
      )
    }
  }
  return canos
}


// 
// [Telas]
//
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.iniciliza) {
    telaAtiva.iniciliza()
  }
}

const Telas = {
  INICIO: {
    iniciliza() {
      globais.flappyBird = criaFlappyBird()
      globais.chao = criaChao()
      globais.canos = criaCanos()
    },
    desenha() {
      planoDeFundo.desenha()
      globais.chao.desenha()
      globais.flappyBird.desenha()
      globais.canos.desenha()
      // mensagemGetReady.desenha()
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {
      globais.chao.atualiza()
    }
  }
}

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha()
    globais.chao.desenha()
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

  telaAtiva.desenha()
  telaAtiva.atualiza()

  frames = frames + 1
  requestAnimationFrame(loop)
}


window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)
loop()