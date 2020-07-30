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
    y: canvas.height-204,
    desenha(){
        contexto.fillStyle = '#60b9f5'
        contexto.fillRect(0,0,canvas.width,canvas.height)
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
            (planoDeFundo.x+planoDeFundo.w), planoDeFundo.y,
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
    y: canvas.height-112, // o canvas - a h do objeto
    desenha(){
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
            (chao.x+chao.w), chao.y,
            chao.w, chao.h,
        )
    }
}

const flappyBird = {
    sX: 0,
    sY: 0,
    w: 33,
    h: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade+flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.sX, flappyBird.sY, // Sprite X, Sprite Y
            flappyBird.w, flappyBird.h, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.w, flappyBird.h,
        )
    }
}

const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50, // o canvas - a algura do objeto
    desenha(){
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

let TelaAtiva = {}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela
}

const Telas = {
    INICIO: {
        desenha(){
            planoDeFundo.desenha()
            chao.desenha()
            flappyBird.desenha()
            mensagemGetReady.desenha()
        },
        atualiza(){

        }
    }
}

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha()
        chao.desenha()
        flappyBird.desenha()
    },
    atualiza(){
        flappyBird.atualiza()
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

//11:58 vídeo 03