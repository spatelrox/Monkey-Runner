var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var gameState;

score = 0;

gameState = 'play';

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,600)
  
  ground = createSprite(300,600,600,75)
  ground.shapeColor = "green";
  ground.velocityX = -10;
  
  monkey = createSprite(75,525)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  
  obstacleGroup = createGroup();
  
}


function draw() {
  background("skyblue");
  
  fill("black")
  text("Score: " + score, 500,50);
  
  monkey.collide(ground);
  
  if(ground.x == 290){
    ground.x = 300;
  }
  
  monkey.debug = true;
  
  if(gameState == 'play'){
    ground.velocityX = 0;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(frameCount % 100 == 0) {
      spawnObstacles();
    }
    
    if(keyWentDown("space") && monkey.y >= 450){
      monkey.velocityY = -25;
    }
    
    monkey.velocityY = monkey.velocityY + 1.2;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = 'over';
    obstacle.velocityX = 0;
    monkey.velocityY = 0;
  }
  
  if(gameState == 'over'){
    fill("black");
    textSize(20)
    text("You Lost!",270,275);
    text("Press 'R' to Restart",230,325)
  }
  
  if(keyDown("r")){
    gameState = 'play';
    
    monkey.x = 75;
    monkey.y = 525;
  }

  drawSprites();
}

function spawnObstacles(){
  obstacle = createSprite(600,540,25,25);
  
  obstacle.velocityX = -(6 + score/100)
  obstacle.addImage(obstacleImage)
  
  obstacle.scale = 0.2;
  
  obstacleGroup.add(obstacle);
}






