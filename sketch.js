//Create variables here

var database,data;

var dog, happyDog, database, foodS, foodStock;

var feedPet, addFood;
var feedTime, lastFed;

function preload()
{
  //load images here
  
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
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

  textSize(20)
  fill("white");
  //text("Note: Press the 'up arrow' key to feed your pet",50,30);
  text("Food remaining: " + foodS,140,60);

  foodObj.display();

  textSize(20)
  fill("white");
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

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })

}

function addFood(){

  dog.addImage(dog1);

 foodS++;

  database.ref('/').update({
    Food:foodS
  })
}



