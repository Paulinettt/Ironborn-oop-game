class Game {  //the general logic of the game here
    constructor(create, draw){  //this is the createDomElement function.Just a name to describe argument I expect. Free to choose name here.
        this.player = null;   //constructor not compulsory, good to see what we have?
        this.create = create;
        this.draw = draw;
    }

    start(){
        // create and draw player
        this.player = new Player();  //property of current object can be accessed in other methods (this.player)
        this.player.domElement = this.create("player");  //create dom element with class "player"
        this.draw(this.player);


        //create and draw an obstacle
        this.obstacle = new Obstacle(); 
        this.obstacle.domElement = this.create("obstacle");
        this.draw(this.obstacle);

        //move obstacle

        setInterval ( () => { //with arrow function, it refers to the current object. can still access things outside of arrow function. With normal function, I can't (with the word function()).
            
            this.obstacle.moveDown();
            this.draw(this.obstacle);
         }, );   
        
        

    }

    movePlayer (direction){
        if (direction ==="left") {
            this.player.moveLeft();
        } else if (direction === "right"){
            this.player.moveRight();
        }
        this.draw(this.player);
    }  
}


class Player {
    constructor (){
        this.positionX = 50;
        this.positionY = 50;
        this.domElement = null;
        
    }

    moveLeft(){
        this.positionX--;
        
    }


    moveRight(){
        this.positionX++;
    }

}

class Obstacle {
    constructor() {
        this.positionX = 50; //should be random
        this.positionY = 100;
        this.domElement = null; //we want to store it as a property
    }

    moveDown(){
        this.positionY--;
    }
 



}

