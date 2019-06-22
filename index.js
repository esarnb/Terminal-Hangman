var Word = require("./Word");
var colors = require("colors");
var randomWords = require("random-words");
var inquirer = require("inquirer");

var bank, tries, newWord; 

function createGame() {
    bank = [];
    tries = 10;
    newWord = new Word(randomWords()); 
    askQuestions();
}

function askQuestions() {
    console.clear();
    var currentWord = newWord.display();
    if ((tries > 0) && (currentWord.includes("_"))) {
        console.log(newWord.display().cyan, "\nTries: " + tries, "\nUsed Keys: " + `[${bank.join(" ")}]`);
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter: ",
                name: "inputLetter",
                validate: function(answer) {
                    if (!(/[A-Za-z]/g).test(answer) || answer.length > 1 || bank.includes(answer.toLowerCase())) return false;
                    else return true;
                }
            }
        ]).then(function(response){
            newWord.checkLetter(response.inputLetter.toLowerCase());
            bank.push(response.inputLetter.toLowerCase());
            if (currentWord === newWord.display()) tries--;

            askQuestions();
        })
    }
    else {
        console.clear();
        var correctWord = " The word was: ".yellow + newWord.letters.map(el => el.letter).join("").cyan; 
        if (tries < 1) console.log(" You Lost :c ".red + correctWord);
        else console.log("You Win!".green + correctWord);

        inquirer.prompt([{
            type: "confirm",
            message: "Would you like to play again?",
            name: "playAgain"
        }]).then((response) => {
            if (response.playAgain) createGame();
            else console.log("Thanks for playing!".cyan);
        })
    }
}

console.clear();

createGame();