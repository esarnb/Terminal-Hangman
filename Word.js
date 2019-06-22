var Letter = require("./Letter")

/**
 * 
 * @param {String} newWord is the word to be guessed.
 * 
 * The constructor creates an object based on the word, holding
 * a list of letter objects and functions to do work on each letter.
 */
var Word = function(newWord) {
    //The new word is inputted, each letter is separated, and 
    //each letter object is put into a new array, making a list.
    this.letters = newWord.split("").map(el => new Letter(el))

    /**
     * The display function takes each letter object, calls to
     * see if it has been guessed or not and display a letter
     * or an underscore depending on the state, and the response
     * is pushed into a new array. Then all letters are concatenated.
     */
    this.display = function() {
        return this.letters.map(el => el.display()).join(" ")
    }

    /**
     * Check letter function takes in a character the user inputs,
     * and sends it to the Letter object method "checking", 
     * -for each individual letter object in the word-, in order 
     * to be checked whether or not the letters are the same.
     */
    this.checkLetter = function(char) {
        for(eachLetter of this.letters) {
            eachLetter.checking(char)
        }
    }
}

module.exports = Word;