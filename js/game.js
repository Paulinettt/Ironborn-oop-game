class Game {  //the general logic of the game here
    constructor(create, draw){  //this is the createDomElement function.Just a name to describe argument I expect. Free to choose name here.
        this.time = 0;
        this.player = null; 
        this.setIntervaId = null;
        this.obstacles = []; // array of instances of the class Obstacle 
        this.create = create;
        this.draw = draw;
    }

    start(){
        // create and draw player
        this.player = new Player();  //property of current object can be accessed in other methods (this.player)
        this.player.domElement = this.create("player");  //create dom element with class "player"
        this.draw(this.player);





        //move obstacle

           this.setIntervaId = setInterval ( () => { //with arrow function, it refers to the current object. can still access things outside of arrow function. With normal function, I can't (with the word function()).
            
            //move obstacle every iteration of this interval
            this.obstacles.forEach( (obstacle) => {
                obstacle.moveDown();
                this.draw(obstacle);
                this.detectCollision(obstacle);
                this.detectObstacleOutside(obstacle);
            });

            if (this.time % 30 === 0) {
              // create and draw obstacle every 10 iteration
              const newObstacle = new Obstacle();
              newObstacle.domElement = this.create("obstacle"); 

              this.obstacles.push(newObstacle);
            
            }

            this.time++;

         }, 50);   
    
}


detectCollision(obstacle){
    if (this.player.positionX < obstacle.positionX + obstacle.width &&
        this.player.positionX + this.player.width > obstacle.positionX &&
        this.player.positionY < obstacle.positionY + obstacle.height &&
        this.player.height + this.player.positionY > obstacle.positionY) {
            console.log("game over")
            //clearInterval(this.intervalId)
    }
}

detectObstacleOutside (obstacle) {   //obstacle is an instance of the class Obstacle (not a DOM element)
     if (obstacle.positionY < 0 ){
         //obstacle to remove in this.obstacles
         this.obstacles.shift() //remove from array
         obstacle.domElement.remove() //remove from the dom (not "this.domElement" because domElement not a proprety of my current class, but the obstacle class)
     }

}

movePlayer(direction){
    if(direction === "left"){
        this.player.moveLeft();
    } else if (direction === "right"){
        this.player.moveRight();
    }
    this.draw(this.player);
}
}


class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 10;
        this.height = 10;
        this.domElement = null; //store the newElm
    }

    moveLeft() {
        this.positionX--;
    }

    moveRight() {
        this.positionX++;
    }
}


class Obstacle {
    constructor(){
        
        //this.positionX = (Math.random() * 100);
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1 )); //random between 0 and (100-this.width)
        this.positionY = 100;

        this.domElement = null; //store the newElm
    }
    moveDown() {
        this.positionY--;
    }
}

