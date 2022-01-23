var monkey,monkeyimage;
var banana,bananaImage,bananaGroup;
var obstacleGroup,obstacle,obstacleImage;
var score,ground,invisibleground,gamestate="serve",score=0,survivaltime=0;

function preload(){
monkeyimage =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaimage = loadImage("banana.png");
obstacleimage = loadImage("obstacle.png");
}

function setup(){
createCanvas(500,400);

monkey = createSprite(60,315,15,15);
monkey.addAnimation("monkeywalk",monkeyimage);
monkey.scale =0.14;

ground = createSprite(200,350,600,7);
invisibleground = createSprite(200,355,600,7);

bananagroup = createGroup();
obstaclegroup = createGroup();
}

function draw(){
background(300);

if(gamestate==="serve"){
if(keyDown("s")){
gamestate = "play";
}}else if(gamestate==="play"){
if(monkey.isTouching(ground)){
if(keyDown("space")){
monkey.velocityY=-20;
createthings();
}
survivaltime=survivaltime+Math.round(getFrameRate()/60);
}
monkey.velocityY=monkey.velocityY+0.8;
}

if(monkey.isTouching(bananagroup)){
score = score+1;
bananagroup.destroyEach();
}else if(monkey.isTouching(obstaclegroup)){
text("gameover",200,200);
}

monkey.collide(invisibleground);
drawSprites();
stroke("black");
fill("black");
text("SurvivalTime in (seconds) in the game daycycle :  "+survivaltime,50,10);
text("press s to start",200,100);
text("score :"+score,400,10);
}

function createbanana(){
if (frameCount % 80 === 0) {
var banana = createSprite(600,Math.round(random(120,200)),10,10);
banana.addImage(bananaimage);
banana.scale=0.14;
banana.velocityX=15;
banana.lifetime=500;
bananagroup.add(banana);
}}

function createobstacle(){
if (frameCount % 300 === 0) {
var obstacle = createSprite(600,300,10,10);
obstacle.addImage(obstacleimage);
obstacle.velocityX=-5;
obstacle.scale =0.4;
obstacle.collide(invisibleground);
obstaclegroup.add(obstacle);
}}

function createthings(){
var r = Math.round(random(1,2));
if(r===1){
createbanana();
}else if(r===2){    
createobstacle(); 
} }