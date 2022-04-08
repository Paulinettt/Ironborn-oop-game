//DOM manipulation in this file - logic related to the user interface



function createDomElement (className){ //create element and add it to the DOM 
    // step1: create the element --> createElement('h2');
    // step2: add content --> ex. innerHTML
    // step3: append to the dom --> parent.appendChild(elm)
    
    const board = document.getElementById("board"); 
    const newElm = document.createElement("div");
    newElm.className = className;

    board.appendChild(newElm);

    return newElm; //we return to store this somewhere else
    
}

function drawDomElement(instance) { //will repaint something/modify the css. receives instance of a class ("player or obstacle")
    instance.domElement.style.width = instance.width + "vw";
    instance.domElement.style.height = instance.height + "vh";

    instance.domElement.style.left = instance.positionX + "vw";
   instance.domElement.style.bottom = instance.positionY + "vh";

}


const game = new Game(createDomElement, drawDomElement); //pass a function as an argument. interacting with the class Game
game.start();

document.addEventListener("keydown", function (event) {
/*   //click, keydown, keypress (possibilities)
  //console.log(event.key)  //shows the key you press on the console
  if (event.key === "ArrowRight") {
    console.log("we move right");
  } else if (event.key === "ArrowLeft") {
    console.log("we move left");
  } */

 
    switch(event.key){
        case "ArrowRight":
            game.movePlayer('right');
            break;
        case "ArrowLeft":
            game.movePlayer ("left");
            break;
    }

});







