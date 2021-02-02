// creating edge variable
var edges;

// creating game state variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

// sprite variables
var boy, road, cash, diamond, jwell, ruby, sword, gameOver;

// image variables
var boyRunning, boyCollided, roadImg, cashImg, jwellImg, diamondImg, rubyImg, swordImg, gameOverImg;

// treasure collection variable
var treasureCollection = 0;

// group variables
var cashGroup, diamondGroup, jwellGroup, rubyGroup, swordGroup;

function preload()
{
  // loading images and animations
  boyRunning = loadAnimation("runner1.png","runner2.png");
  boyCollided = loadAnimation("runner1.png");
  roadImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  jwellImg = loadImage("jwell.png");
  diamondImg = loadImage("diamonds.png");
  rubyImg = loadImage("ruby.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
  
}

function setup()
{
  // creating canvas
  createCanvas(300, 450);
  
  // creating road
  road = createSprite(150, 225, 300, 450);
  road.addImage("road", roadImg);
  road.velocityY = 5;
  
  // creating boy
  boy = createSprite(60, 350, 20, 50);
  boy.addAnimation("running", boyRunning);
  boy.scale = 0.070;
  
  // creating game over animation
  gameOver = createSprite(150, 225, 20, 20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  // creating group
  cashGroup = createGroup();
  diamondGroup = createGroup();
  jwellGroup = createGroup();
  rubyGroup = createGroup();
  swordGroup = createGroup();
  
  // setting collider to boy
  boy.setCollider("circle", 0, 0, 320);
  
}

function draw()
{
  // creating background
  background("white");
  
  // drawing sprites
  drawSprites();
  
  // creating edge sprites
  edges = createEdgeSprites();
  
 if(gameState === PLAY)
 {
  
  // adding movement to player
  boy.x = World.mouseX;
   
  gameOver.visible = false;
  
  // creating infinite road
  if(road.y > 1000)
  {
     road.y = height / 2;
     
  }
   
  // spawning treasure and swords
  if(frameCount % 100 === 0)
  {
    spawnSword(); 
    
  }
   if(frameCount % 60 === 0)
  {
    spawnCash(); 
    
  }
   
  if(frameCount % 120 === 0)
  {
    spawnJwell(); 
    
  }
   
  if(frameCount % 160 === 0)
  {
    spawnDiamond(); 
    
  }
   
  if(frameCount % 270 === 0)
  {
    spawnRuby(); 
    
  }
  
   
  // displaying treasure collection
  textSize(15);
  fill("red");
  text("Treasure Collection: " + treasureCollection, 100, 30);
   
   // adding score
   if(boy.isTouching(cashGroup))
   {
      treasureCollection = treasureCollection + 50;
      cash.destroy();
      
   }
   
   if(boy.isTouching(jwellGroup))
   {
      treasureCollection = treasureCollection + 100;
      jwell.destroy();
      
   }
   
   if(boy.isTouching(diamondGroup))
   {
      treasureCollection = treasureCollection + 200;
      diamond.destroy();
      
   }
   
   if(boy.isTouching(rubyGroup))
   {
      treasureCollection = treasureCollection + 400;
      ruby.destroy();
      
   }
   
   if(boy.isTouching(swordGroup))
   {
      sword.destroy();
      gameState = END;
      
   }
   
   if(gameState === END)
   {
      road.velocityY = 0;
      jwellGroup.destroyEach();
      cashGroup.destroyEach();
      diamondGroup.destroyEach();
      diamondGroup.destroyEach();
      boy.changeAnimation("collided", boyCollided);
      gameOver.visible = true;
      
   }
  
}
  
  // adding collisions
  boy.collide(edges);
  
}

function spawnSword()
{
  // spawning swords
  sword = createSprite(random(30, 270), random(20, 200), 20, 20);
  sword.velocityY = 5;
  sword.addImage(swordImg);
  sword.scale = 0.15;
  sword.lifetime = 200;
  swordGroup.add(sword);
  
}

function spawnCash()
{
  // spawning cash
  cash = createSprite(random(30, 270), random(20, 200), 20, 20);
  cash.velocityY = 5;
  cash.addImage(cashImg);
  cash.scale = 0.2;
  cash.lifetime = 200;
  cashGroup.add(cash);
  
}

function spawnJwell()
{
  // spawning jwell
  jwell = createSprite(random(30, 270), random(20, 200), 20, 20);
  jwell.velocityY = 5;
  jwell.addImage(jwellImg);
  jwell.scale = 0.2;
  jwell.lifetime = 200;
  jwellGroup.add(jwell);
  
}

function spawnDiamond()
{
  // spawning diamonds
  diamond = createSprite(random(30, 270), random(20, 200), 20, 20);
  diamond.velocityY = 5;
  diamond.addImage(diamondImg);
  diamond.scale = 0.050;
  diamond.lifetime = 200;
  diamondGroup.add(diamond);
  
}

function spawnRuby()
{
  // spawning ruby
  ruby = createSprite(random(30, 270), random(20, 200), 20, 20);
  ruby.velocityY = 5;
  ruby.addImage(rubyImg);
  ruby.scale = 0.1;
  ruby.lifetime = 200;
  rubyGroup.add(ruby);
  
}
