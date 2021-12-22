var bg,bgImg;
var bg2, bg2Img
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var zombieGrp
var bullet 
var bulletGrp
var score=0
var gameState="wait"
var life=3
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var bullets=15
var fears=["the fear of being judged", "peer pressure", "social phobia", "loneliness", "anxiety","failure", "trust issues", "fomo issues", "Claustrophobia", "depression"]
var switchhh=0 
var j = 0
var winSound
var explosionSound
var loseSound
fear=""
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  bg2Img = loadImage("assets/bg2.jpg")
  buttonImg = loadImage("assets/kill.png")

  zombieImg= loadImage("assets/zombie.png")
 
  heart1Img= loadImage("assets/heart_1.png")
  heart2Img= loadImage("assets/heart_2.png")
  heart3Img= loadImage("assets/heart_3.png")

  winSound= loadSound("assets/win.mp3")
  explosionSound=loadSound("assets/explosion.mp3")
  loseSound=loadSound("assets/lose.mp3")
  

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  //bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg.addImage(bgImg)
//bg.scale = 1
//bg.visible=false

//bg2 = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg2.addImage(bg2Img)
//bg2.scale = 1.7

heart1=createSprite(140,50)
heart1.addImage(heart1Img)
heart1.scale=0.4

heart2=createSprite(140,50)
heart2.addImage(heart2Img)
heart2.scale=0.4

heart3=createSprite(140,50)
heart3.addImage(heart3Img)
heart3.scale=0.4

zombieGrp=new Group()
bulletGrp= new Group()

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   button1=createSprite(600,600)
button1.addImage(buttonImg)
button1.scale=0.3





}

function draw() {
  

  if (gameState==="wait"){
    background(bg2Img);
    fill("white")
    textSize(30)
    text("Kill your fears before they kill you", 500,100)
 
    text("Are you ready to overcome your fears?", 500,400)
    text("If yes click on the button",500,500)
    
    if(mousePressedOver(button1)){
      gameState="warZone"
      button1.visible=false;
    }
}

  if(gameState==="warZone"){
    background(bgImg);
  
    button1.visible =false
    

    if(life===3){
      heart1.visible=false 
      heart2.visible=false 
      heart3.visible=true
    }
    if(life===2){
      heart1.visible=false 
      heart2.visible=true
      heart3.visible=false
    }
    if(life===1){
      heart1.visible=true
      heart2.visible=false 
      heart3.visible=false
    }

    if(life===0){
      gameState="defeated"
      heart1.visible=false
      heart2.visible=false 
      heart3.visible=false
      loseSound.play()

    }
    if(bullets===0){
      gameState="bullet"
      loseSound.play()
    }
    if(score===10){
      gameState="win"
      winSound.play()
    }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  if(player.y>=100){
    
  player.y = player.y-30
  }
}
if(keyDown("DOWN_ARROW")||touches.length>0){
  if(player.y<=650){
 player.y = player.y+30
}
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet= createSprite(displayWidth-1150, player.y-25, 20, 10);
 bullet.velocityX=20
 bulletGrp.add(bullet)
 bullets=bullets-1

 player.addImage(shooter_shooting)
 explosionSound.play()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies()
if(zombieGrp.isTouching(bulletGrp)){
  switchhh=0
  for(var i=0;i<zombieGrp.length;i++){
  if(zombieGrp[i].isTouching(bulletGrp))
{
  score=score+1
  switchhh=1
  j = j+1
  fear=fears[j]
  zombieGrp[i].destroy()
  bulletGrp.destroyEach()

}
}
}
if(zombieGrp.isTouching(player)){
  for(var i=0; i<zombieGrp.length; i++){
    if(zombieGrp[i].isTouching(player)){
      life=life-1
      zombieGrp[i].destroy()
    }
  }
}
    }
drawSprites();
if (switchhh===1){
 displayfear()
}
textSize(30)
fill("white")
text("Score: "+score,displayWidth-100, 50)

textSize(30)
text("Bullets: "+bullets,68, 130)

if(gameState==="defeated"){
  fill("white")
  textSize(45)
  text("You couldn't overcome your fears:(", displayWidth/2-200, displayHeight/2)
  zombieGrp.destroyEach()
  player.destroy()
  
}
if(gameState==="win"){
  fill("white")
  textSize(45)
  text("yay you did it:)", displayWidth/2-120, displayHeight/2)
  zombieGrp.destroyEach()
  player.destroy()
}
if(gameState==="bullet"){
  fill("white")
  textSize(45)
  text("You ran out of bullets!",displayWidth/2-130, displayHeight/2)
  zombieGrp.destroyEach()
  player.destroy()
  bulletGrp.destroyEach()
}
}


function spawnZombies(){
  if(frameCount%65===0){

  zombie= createSprite(random(700,1300), random(100,650))
  zombie.addImage(zombieImg)
  zombie.velocityX=-3
  zombie.scale= 0.14
  zombie.lifetime=400
  zombieGrp.add(zombie)
}
}
function displayfear()
{
  fill("black")
  textSize(45)
  text("You just killed "+fear,displayWidth/2-185, displayHeight/2-265)
  //switchhh=0
}

