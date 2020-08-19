//Create variables here

var database,data;

var dog, happyDog, database, foodS, foodStock;

var feedPet, addFood;
var feedTime, lastFed;

var gameState = "";

var changeState, readState, currentTime;

var bedroom, garden, washroom;

function preload()
{
  //load images here
  
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  sadDog = loadImage("images/virtual-pet-images/sadDog.png");
}

function setup() {
  createCanvas(1000,500); 

  database = firebase.database();
  
  dog = createSprite(800,250,30,30);
  dog.addImage(dog1)
  dog.scale = 0.4;

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState = database.ref('petState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  feed = createButton("Feed your dog");
  feed.position(700,95);
  feed.mousePressed(feedPet);

  addFoodButton = createButton("Restock");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood)
}


function draw() {  

  background(rgb(46, 139, 87));

  drawSprites();
  //add styles here

  foodObj.display();

  if(gameState != "hungry"){
    addFoodButton.hide();
    feed.hide();
  } else if(gameState == "hungry"){
    feed.show();
    addFoodButton.show();
    dog.addImage(sadDog);
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime == (lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime > (lastFed+2) &&  currentTime <= (lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }

  textSize(20)
  fill("black");
  //text("Note: Press the 'up arrow' key to feed your pet",50,30);
  text("Food remaining: " + foodS,140,60);

  textSize(20)
  fill("black");
  if(lastFed>12){
    text("Last fed: " + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last fed: 12 AM", 350,30);
  }else{
    text("Last fed: " + lastFed + "AM",350,30);
  }
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedPet(){

  if(foodS != 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });

  dog.addImage(happyDog);
}

function addFood(){

  dog.addImage(dog1);

 foodS++;

  database.ref('/').update({
    Food:foodS
  });
}

function update(state){
  database.ref('/').update({
    petState:state
  });
}



