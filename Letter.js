/**
 * 
 * @param {String or Char} letter is the single letter taken from
 * the entire word given from the Word constructor. 
 * 
 * This Constructor is used to create a list of letter-objects.
 */
var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;

    /**
     * The display function is used to return the letter or
     * the underscore based on it's guessed state.
     */
    this.display = function() {
        if (this.guessed) return this.letter;
        else return "_";
        
    }
    
    /**
     * The checking function uses checkThisLetter user's input to check
     * it against itself. If it's the same, the letter has been guessed.
     */
    this.checking = function(checkThisLetter) {
        if (checkThisLetter == this.letter) {
            this.guessed = true;
        } 
    }
}

module.exports = Letter;