let numPlays = 0;
let currentPlayer = "X";
let currentPlays = {
    X: [],
    O: []
}

const winningLines= [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]


$(document).ready(function (){
    $('.cell').on('click', function() {
        numPlays ++
        $(this).text(currentPlayer);
        currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));

        if (isWinner()) {
            alert('Winner: ' + currentPlayer);
        }
       
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    })
})

function isWinner() {
    if (numPlays < 5)
        return;
}

for (let i=0; i <winningLines.length; i++) {
    let isWinner = true;
    for (let j=0; j < winningLines[i].length; j++) {
        if($.inArray(winningLines[i][j], currentPlayer[currentPlayer])<0) {
            isWinner = false;
            break;
        }
    }
}
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