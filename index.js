var Word = require("./Word");
var colors = require("colors");
var inquirer = require("inquirer");
var randomWords = require("random-words");

var bank, tries, newWord; 

/**
 * Function createGame resets all variables and 
 * requests a new word for the upcoming round.
 * Then it calls on the helper function askQuestions
 * to begin the game.
 */
function createGame() {
    bank = [];
    tries = 10;
    newWord = new Word(randomWords()); 
    askQuestions();
}

/**
 * Function askQuestions first clears the console to get rid of unecessary text.
 * Then, checks to see if the game is still valid to continue.
 * 
 * If it is, Inquirer will ask the user to put a letter, verify the input,
 * and then do work to uncover letters and recursively asks the question again.
 * Else, the game has ended either with no remaining tries, or the user has guessed all letters.
 * 
 * Inquirer then asks if the user wants to play again. 
 */
function askQuestions() {
    console.clear(); //Clear previous tries' unnecessary text
    var currentWord = newWord.display(); //Get the current word progress
    
    //If the user has tries left and the word has undiscovered letters
    if ((tries > 0) && (currentWord.includes("_"))) {
        //Display to the user the current word
        console.log(currentWord.cyan, "\nTries: " + tries, "\nUsed Keys: " + `[${bank.join(" ")}]`);
        //Ask the user to input a letter. Validate if its an alphabetical letter and not used yet.
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
            //uncover discovered letters
            newWord.checkLetter(response.inputLetter.toLowerCase());
            //push the new letter into the bank
            bank.push(response.inputLetter.toLowerCase());
            //If the user does not discover a new letter, decrement try.
            if (currentWord === newWord.display()) tries--;
            //Ask the question again.
            askQuestions();
        })
    }
    else {
        console.clear(); //Clear guess letters text
        var correctWord = " The word was: ".yellow + newWord.letters.map(el => el.letter).join("").cyan; 
        if (tries < 1) console.log(" You Lost :c ".red + correctWord);
        else console.log("You Win!".green + correctWord);
        //Ask user to play again. If so, reset game variables and run game.
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

//Clears unecessary text.
console.clear();

//Creates important variables and runs the initial game.
createGame();