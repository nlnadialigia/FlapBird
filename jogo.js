console.log('[StarDev] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height-204,
    desenha(){
        contexto.fillStyle = '#60b9f5'
        contexto.fillRect(0,0,canvas.width,canvas.height)
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite X, Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
            (planoDeFundo.x+planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height-112, // o canvas - a altura do objeto
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura,
        )
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // Sprite X, Sprite Y
            chao.largura, chao.altura, // Tamanho do recorte na sprite
            (chao.x+chao.largura), chao.y,
            chao.largura, chao.altura,
        )
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
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
            flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        )
    }
}


function loop() {
    flappyBird.atualiza()
    
    planoDeFundo.desenha()
    chao.desenha()
    flappyBird.desenha()
    
    
    
    

    requestAnimationFrame(loop)    
}

loop()