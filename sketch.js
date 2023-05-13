var trex,trexCorrendo,chao,imagemChao,subChao,imagemNuvem,imagemFim,imagemReiniciar;
 var imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6 

var somPulo,somMorrendo,somCheckPoint
 
 const jogar = 1;
 const encerrar = 0;
var estadoJogo = jogar;


function preload (){
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
trexCollidiu = loadAnimation("trex_collided.png")
  imagemChao = loadImage("ground2.png")
  imagemNuvem = loadImage("cloud.png")
  
  
imagemCacto1 = loadImage("obstacle1.png")
  
imagemCacto2 = loadImage("obstacle2.png")
  
imagemCacto3 = loadImage("obstacle3.png")
  
imagemCacto4 = loadImage("obstacle4.png")
  
imagemCacto5 = loadImage("obstacle5.png")
  
imagemCacto6 = loadImage("obstacle6.png")
  
  
imagemFim = loadImage("gameOver.png")
imagemReiniciar =  loadImage("restart.png")
somPulo = loadSound("jump.mp3")
somMorrendo = loadSound("die.mp3")
somCheckPoint = loadSound("checkPoint.mp3")

  
  
}


function setup() {
createCanvas(600,200)
  
trex = createSprite(50,100,20,40)
trex.addAnimation("correndo",trexCorrendo)
trex.addAnimation("collidiu",trexCollidiu)
  trex.scale = 0.5
chao = createSprite(200,180,500,10)
chao.addAnimation("chao",imagemChao)
  
subChao=createSprite(200,190,500,10)
subChao.visible = false

fimDeJogo = createSprite(300,80,30,30)
fimDeJogo.addAnimation("fimdejogo",imagemFim)
fimDeJogo.scale = 0.5
reiniciar = createSprite(300,120,30,30)
reiniciar.addAnimation("reiniciar",imagemReiniciar)
reiniciar.scale = 0.5

  
tempoJogo = 0;
trex.setCollider("circle",0,0,40)
trex.debug = false
grupoDeCactos = new Group();
grupoDeNuvens = new Group(); 


 

}

function draw() {

background(180)
text("tempo:"+ tempoJogo,500,30)

  
  
  
  
  
if (estadoJogo == jogar){
tempoJogo =  tempoJogo +1; 
if(tempoJogo > 0 && tempoJogo % 100 == 0  ){
  
  somCheckPoint.play()
}
tempoJogo = tempoJogo + 1
fimDeJogo.visible = false
reiniciar.visible = false
chao.velocityX = -3
  
  if (chao.x < 0){
     chao.x = chao.width / 2 
    chao.velocityX = - (3 + tempoJogo/100 )
    
  }
    

    


  if(keyDown("space")&& trex.y > 161 ){
    trex.velocityY =  - 10
    somPulo.play()
   
  }
   
trex.velocityY = trex.velocityY + 0.5
trex.collide(subChao)

  
  

  
  
gerarNuvens()
gerarCactos()
  
if(grupoDeCactos.isTouching(trex)){

estadoJogo = encerrar;
somMorrendo.play()
  
  
  
}
  
    
  
}else if(estadoJogo == encerrar){
  
chao.velocityX = 0
fimDeJogo.visible = true
reiniciar.visible = true

grupoDeNuvens.setVelocityXEach(0);
  
grupoDeCactos.setVelocityXEach(0);
  

grupoDeNuvens.setLifetimeEach(-1);
  
grupoDeCactos.setLifetimeEach(-1);

trex.changeAnimation("collidiu",trexCollidiu)
  trex.velocityY = 0;
  
  
    
if(mousePressedOver(reiniciar)  ){

  
  restart()
  
  
  
}
  
  
}

  

  
drawSprites()
}







function restart(){
estadoJogo = jogar
fimDeJogo.visible = false;
reiniciar.visible = false;
grupoDeCactos.destroyEach()
grupoDeNuvens.destroyEach()
trex.changeAnimation("correndo",trexCorrendo)
tempoJogo = 0
} 
  
function gerarCactos(){
if(frameCount %  60 == 0){
cacto = createSprite(600,165,10,40)
cactoVelocityX  = -(3 + tempoJogo / 100)
cacto.velocityX = - 3
escolherCacto = Math.round(random(1,6))
  
switch(escolherCacto){
  case 1 : cacto.addImage(imagemCacto1)
    cacto.scale = 0.6
                     break
case 2 : cacto.addImage(imagemCacto2)
    cacto.scale = 0.5
                     break
case 3: cacto.addImage(imagemCacto3)
    cacto.scale = 0.5
                     break
case 4 : cacto.addImage(imagemCacto4)
    cacto.scale = 0.6
                     break
case 5: cacto.addImage(imagemCacto5)
    cacto.scale = 0.6
                     break
case 6 : cacto.addImage(imagemCacto6)
    cacto.scale = 0.4
                     break
  default: break;
  
  
  
  
  }
   
  
  cacto.lifetime = 300;
  grupoDeCactos.add(cacto);
  
  
  
  
  
  
}
  
}
  
  
function gerarNuvens () {
if(frameCount %  60 == 0){
nuvem = createSprite(600,100,50,10)
nuvem.velocityX = - 3
nuvem.addAnimation("nuvempassando",imagemNuvem)
nuvem.y = Math.round(random(60,100))
nuvem.depht = trex.depth
nuvem.depht = trex.depth + 1 
nuvem.escale = 0.4
  
nuvem.lifetime = 300

  grupoDeNuvens.add(nuvem);
  
}
  
  
  
}


  
 
