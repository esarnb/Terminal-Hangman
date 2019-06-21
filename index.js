var Word = require("./Word");

var arr = ["hey", "hello"];

var newWord = new Word(arr[Math.floor(Math.random() * arr.length)]); 


var inquirer = require("inquirer");
var colors = require("colors");
var tries = 10;

function runGame() {
    console.log("Please run Word Display #1".yellow);
    
    var stillGoing = newWord.display().includes("_");
    if ((tries > 0) && (stillGoing)) {
        console.log("Please run Word Display #2".yellow);

        console.log(newWord.display());
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter: ",
                name: "inputLetter",
                validate: function(answer) {
                    return isNaN(answer);
                }
            }
        ]).then(function(response){
            newWord.checkLetter(response.inputLetter)
            tries--;
        }).then(() => {
            runGame();
        })
    }
    else {
        if (tries < 1) console.log("You Lost!");
        else console.log("You Win!");
        tries = 10;
    }
}

runGame();
