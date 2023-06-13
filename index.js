// things from WAR GAME that may help with play...

class Player {
    constructor(name) { // passing player name through
        this.name = name; // player name
        this.score = 0 // starting and default score
    }
}
class gamePlay {
    constructor () {
        this.player1 = null;
        this.player2 = null;
    }
    startGame() {
    // To create two new players
        this.player1 = new Player (prompt('Enter Name for Player One: '));
        this.player2 = new Player (prompt('Enter Name for Player Two: '));
    }

    nameTheWinner () {
        if(this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} is the winner!`);
            console.log(`Final Scores:
            ${this.player1.name}: ${this.player1.score}
            ${this.player2.name}: ${this.player2.score}`);
        } else if(this.player2.score > this.player1.score) {
            console.log(`${this.player2.name} is the winner!`);
            console.log(`Final Scores:
            ${this.player2.name}: ${this.player2.score}
            ${this.player1.name}: ${this.player1.score}`);
        } else {
            console.log("This game ended in a tie. Play again!");
            console.log(`Final Scores:
            ${this.player1.name}: ${this.player1.score}
            ${this.player2.name}: ${this.player2.score}`);
        }
    }
}

// let playTicTacToe = new gamePlay();
// playTicTacToe.startGame(); // method on top of object. Calls the game to begin

// playTicTacToe.nameTheWinner(); // calling the method to name the winner of the game.