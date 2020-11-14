var monkey, monkey_running
var banana, bananaImage
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime = 0;
var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkeyImage = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);

  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.15

  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //making the groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(255);

  //moving the ground
  if (ground.x < 50) {
    ground.x = ground.width / 2;
  }
  //jumping the monkey
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  //giving gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  //colliding the monkey to the ground
  monkey.collide(ground);
  
  //stoping the game if the monkey tounches the obstacle
  if(obstaclesGroup.isTouching(monkey)){
    
    //changing the image for the monkey and giving the velocities 0
    monkey.addAnimation("moving",monkeyImage);
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    //stopping the obstacles and bananas from moving
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    //giving lifetime so that they don't disapear 
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    //stopping the ground
    ground.velocityX = 0;
  }
  
  //displaying the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 400, 50);

  //displaying the survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);

  //function for displaying the bananas and obstacles
  spawnBananas();
  spawnObstacles();

  drawSprites();
}
//function for spawning the clouds
function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(530, 120, 40, 10);
    banana.y = Math.round(random(90, 180));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
//function for spawning the obstacles
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(530, 315, 100, 100);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}