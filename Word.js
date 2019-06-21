var Letter = require("./Letter")

var Word = function(newWord) {
    this.letters = newWord.split("").map(el => new Letter(el))

    this.display = function() {
        console.log("Ran Word.Display".green);
        return this.letters.map(el => el.display()).join(" ")
        
    }

    this.checkLetter = function(char) {
        for(eachLetter of this.letters) {
            eachLetter.checking(char)
            console.log("Checking Each Letter in Word.js".gray);
        }
        console.log("end of word".cyan);
    }
}

module.exports = Word;