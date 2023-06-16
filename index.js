(function($, undefined) {
    'use strict'
    let numPlays = 0;
    let gameEnd = false;
    let currentPlayer = "X";
    let currentPlays = {
        X: [],
        O: [],
    };

    const winningLines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];
      

$(document).ready(function () {
    $(".cell").on("click", function () {
        if(!gameEnd) {
                numPlays++;
                $(this).text(currentPlayer);
                currentPlays[currentPlayer].push(parseInt($(this).attr("data-index")));
            if (playerWins()) {
                gameEnd = true;
                showGameResult('win');
            }
            if(!gameEnd && gameDraw ()) {
                showGameResult('draw')
            }  
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
      }    
  });
});

function playAgain() {
    numPlays = 0;
    gameEnd = false;
    currentPlayer = "X";
    currentPlays = {
            X: [],
            O: [],
        };
    $(".cell, #endMessage").text("");
}

function showGameResult(type) {
    gameEnd = true;
    if (type === 'win') {
        $('#endMessage').text(currentPlayer + " Wins!");
    } else {
        $('#endMessage').text("Game is a draw. Play again!");
    }

    $("#endMessage");
    start-btn.addEventListener( 'click', playAgain);
}

function playerWins() {
  if (numPlays < 5) 
    return;
    for (let i = 0; i < winningLines.length; i++) {
        let playerWins = true;
        for (let j = 0; j < winningLines[i].length; j++) {
          if ($.inArray(winningLines[i][j], currentPlays[currentPlayer]) < 0) {
            playerWins = false;
            break;
          }
        }
    if(playerWins)
        return true;
      }
        return false;
}

function gameDraw() {
    return numPlays == 9;
}


})(jQuery);
