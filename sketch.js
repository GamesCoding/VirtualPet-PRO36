//Create variables here

var database,data;

var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dog1)
  dog.scale = 0.4;
}


function draw() {  

  background(rgb(46, 139, 87));

  drawSprites();
  //add styles here

  textSize(20)
  fill("white");
  text("Note: Press the 'up arrow' key to feed your pet",50,30);
  text("Food remaining: " + foodS,140,60);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  //console.log(foodS);
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



