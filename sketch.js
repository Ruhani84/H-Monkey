var monkey, monkey_running;
var banana, bananaImage, bananagroup;
var obstacle, obstacleImage, obstaclegroup;
var FoodGroup;
var score = 0;
var ground;
var survivaltime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 347, 600, 10);
  ground.velocityX = -4

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background("lightBlue");

  ground.x = ground.width / 2
  console.log(ground.x)
  if (keyDown("space") && monkey.y >= 310) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);

  stroke("purple");
  textSize(20);
  fill("white");
  text("Score:" + score, 400, 50);

  stroke("red");
  textSize(20);
  fill("black");
  survivaltime = survivaltime + Math.ceil(getFrameRate() / 60);
  text("SurvivalTime=" + survivaltime, 100, 50)

  if (monkey.isTouching(bananaGroup)) {
    score = score + 1;
    bananaGroup.destroyEach();
  }
  
  if (monkey.isTouching(obstacleGroup)){
    monkey.changeAnimation("sprite_2.png")
    monkey.setVeocity=0
    obstacle.velocity=0
    bananaGroup.destroyEach()
    stroke("violet");
    textSize(40);
    fill("purple");
    text("GAME OVER",200,200)
  }


  food();
  spawnObstacles();
  drawSprites();
}

function food() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 140, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = banana.depth + 1;

    banana.setCollider("circle", 10, 10, 5);
    banana.debug = false;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 335, 10, 40);

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6
    obstacleGroup.add(obstacle);
  }

}

