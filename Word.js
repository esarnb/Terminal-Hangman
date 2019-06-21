var Letter = require("./Letter")

var Word = function(newWord) {
    this.letters = newWord.split("").map(el => new Letter(el))

    this.display = function() {
        return this.letters.map(el => el.display()).join(" ")
    }

    this.checkLetter = function(char) {
        for(eachLetter of this.letters) {
            eachLetter.checking(char)
        }
    }
}

module.exports = Word;