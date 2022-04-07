class Game {  //the general logic of the game here
    constructor(create, draw){  //this is the createDomElement function.Just a name to describe argument I expect. Free to choose name here.
        this.time = 0;
        this.player = null; 
        this.obstacles = [];  
        this.create = create;
        this.draw = draw;
    }

    start(){
        // create and draw player
        this.player = new Player();  //property of current object can be accessed in other methods (this.player)
        this.player.domElement = this.create("player");  //create dom element with class "player"
        this.draw(this.player);



        //move obstacle

        setInterval ( () => { //with arrow function, it refers to the current object. can still access things outside of arrow function. With normal function, I can't (with the word function()).
            
            //move obstacle every iteration of this interval
            this.obstacles.forEach( (obstacle) => {
                obstacle.moveDown();
                this.draw(obstacle);
                this.detectCollision(obstacle);
            });

            if (this.time % 60 === 0) {
              // create and draw obstacle every 10 iteration
              const newObstacle = new Obstacle();
              newObstacle.domElement = this.create("obstacle");

              this.obstacles.push(newObstacle);

              
              //this.draw(this.obstacle);
            }

            this.time++;

         }, 100);   
    
}


detectCollision(obstacle){
    if (this.player.positionX < obstacle.positionX + obstacle.width &&
        this.player.positionX + this.player.width > obstacle.positionX &&
        this.player.positionY < obstacle.positionY + obstacle.height &&
        this.player.height + this.player.positionY > obstacle.positionY) {
            console.log("game over")
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
        this.domElement = null;
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
        this.positionX = 50;
        this.positionY = 100;
        this.width = 10;
        this.height = 10;
        this.domElement = null;
    }
    moveDown() {
        this.positionY--;
    }
}

