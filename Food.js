class Food{
    constructor(){
        this.foodStock = 0; 
        this.image = loadImage("images/Milk.png");

        bedroom = loadImage("images/virtual-pet-images/Bed-Room.png");
        garden = loadImage("images/virtual-pet-images/Garden.png");
        washroom = loadImage("images/virtual-pet-images/Washroom.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        //foodS = database.ref('Food');
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    bedroom(){
        imageMode(CORNER);
        background(bedroom,550,500)
    }

    garden(){
        imageMode(CORNER);
        background(garden,550,500)
    }

    washroom(){
        imageMode(CORNER);
        background(washroom,550,500)
    }

    remove(){
        //this.image = null;
    }

    display(){

        var x=80, y=100;

        imageMode(CENTER);
        image(this.image,695,315,70,70);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock;i++){
                if(i%10===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30
            }
        }
    }
}