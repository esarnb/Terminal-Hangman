var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;

    this.display = function() {
        if (this.guessed) return this.letter;
        else return "_";
        
    }
    
    this.checking = function(checkThisLetter) {
        if (checkThisLetter == this.letter) {
            this.guessed = true;
        } 
    }
}

module.exports = Letter;