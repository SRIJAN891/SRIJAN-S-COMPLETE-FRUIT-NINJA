//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

var knife,bomb,fruitGroup,monstorGroup,knifesound,bombsound,gameover,restart
var knifeImage,appleimage,bananaimage,guavaimage,orangeimage,berryimage,melonimage,bombimage,gameoverimage,restartimage;


function preload(){
  
  knifeImage = loadImage("knife.png");
  appleimage=loadImage("apple.jpg")
  bananaimage=loadImage("banana2.jpg")
  guavaimage=loadImage("guava.jpg")
  orangeimage=loadImage("orange.jpg")
  berryimage=loadImage("strawberry.jpg")
  melonimage=loadImage("watermelon.jpg")
  gameoverimage=loadImage("download.png")
  restartimage=loadImage("restart.jpg")
  bombimage=loadImage("bomb.jpg")
  knifesound=loadSound("Knife.mp3")
  bombsound=loadSound("bomb.wav")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //creating sword
   
  score=0;
  knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  
  fruitGroup=new Group();
  monstorGroup=new Group();
  gameover=createSprite(240,350,120,100)
    gameover.addImage(gameoverimage)
    gameover.scale=2.5
  restart=createSprite(600,300,120,100)
    restart.addImage(restartimage)
    restart.scale=0.5
  //create fruit and monster Group variable here
}

function draw() {
  background("white");
  if(keyDown("space"))
     {
     gameState=PLAY
}
  
  
  if(gameState===PLAY){
    
   restart.visible=false
    gameover.visible=false;
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    fruits();
  monstors();
  if(fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    knifesound.play();
    score+=20
  }
  if(monstorGroup.isTouching(knife)){
     gameState=END
   fruitGroup.destroyEach()
    monstorGroup.destroyEach();
    bombsound.play()
    
    
    
  }}
  if(gameState===END)
  {
    textSize(17)
    fill("black")
    
    text("CLICK ON RESTART BUTTON ",520,200)
    textSize(17)
    fill("black")
    text("TO RESET THE GAME",520,220)
    
    
    gameover.visible=true;
    restart.visible=true;
    fruitGroup.lifetime=0
    fruitGroup.setVelocityXEach=0;
    knife.lifetime=0
    monstorGroup.lifetime=0
    if(mousePressedOver(restart)){
       reset();
     }
    
    
    
    
  }
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  
  
  
  
  drawSprites();
  
  //Display score
  textSize(25);
  fill("black");
  text("Score : "+ score,250,50);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(width+20,400,20,20)
    fruit.scale=0.2;
    fruit.velocityX= -(score/4+6);
    
    rand=round(random(1,6))
    if(rand==1){
      fruit.addImage(appleimage)
    }
    else if(rand==2){
      fruit.addImage(bananaimage)
    }
    else if(rand==3){
    
      fruit.addImage(melonimage)
      fruit.scale=0.5
      
    }
    else if(rand==4){
      fruit.addImage(orangeimage)
    }
    else if(rand==5){
      fruit.addImage(guavaimage)
    }
    else {
      fruit.addImage(berryimage)
    }
    fruit.y=round(random(height-500,height-20))
    fruit.velocityX=-(score/10+8)
    fruit.setLifetime=100
    fruitGroup.add(fruit)
      
    }}
  function monstors(){
    if(frameCount%180==0){
      monstor=createSprite(width+20,150,20,20)
     
          monstor.addImage(bombimage)
          monstor.scale=0.4
        monstor.velocityX= -(score/10+8);
      
      monstor.y=round(random(height-500,height-20))
      
      monstorGroup.add(monstor)
    }     
}
    
      

function reset(){
      gameState=PLAY
      fruitGroup.destroyEach();
  knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

    monstorGroup.destroyEach();
      score=0
           
}
    
  


