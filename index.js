(function($, undefined) {
    'use strict'
    const cells = document.querySelectorAll(".cell");
    const playerX = "x";
    const playerO = "o";
    let currentPlayer = playerX;

// setting data index array from cells to note when winning line created //
    const winningLines = [
        {combo: [1, 2, 3]},
        {combo: [4, 5, 6]},
        {combo: [7, 8, 9]},
        {combo: [1, 4, 7]},
        {combo: [2, 5, 8]},
        {combo: [3, 6, 9]},
        {combo: [1, 5, 9]},
        {combo: [3, 5, 7]},
    ];
    
//creating board to start off as empty array//
    const gameBoard = Array(cells.length);
    gameBoard.fill(null);
    
// calling sections of html to interact //
    const endGameDiv = document.getElementById("endGame");
    const endGameText = document.getElementById("endGameText");
    const playAgain = document.getElementById("startButton");
    playAgain.addEventListener('click', startNewGame);
    
// something fun I found on a youtube https://www.youtube.com/watch?v=fPew9OI2PnA, so I went and found a sound that works for my page https://soundbible.com/1137-Bubbles.html//
    const gameWonSound = new Audio("sounds/bubbles.wav");
    
// click event listener for when each cell is selected. The hover text was from a youtube and added a little more interactive quality to the board. //

    cells.forEach((cell) => cell.addEventListener("click", cellSelect));
    
function setHoverText() {
// hover cannot stay until clicked //
    cells.forEach((cell) => {
        cell.classList.remove("x-hover");
        cell.classList.remove("o-hover");
      });
    
// the hover will be whichever current player symbol is //
    const hoverClass = `${currentPlayer}-hover`;
    
// can only select blank cells to hover over or eventually select. no turning one into the other //
    cells.forEach((cell) => {
        if (cell.innerText == "") {
            cell.classList.add(hoverClass);
            }
      });
}
        
setHoverText(); // running hover function at beginning of game/page open //
    
// game play //
function cellSelect(event) {
    if (endGame.classList.contains("visible")) {
        return;
        }
    // empty cells can be selected //
    const cell = event.target;
    const cellNumber = cell.dataset.index;
    if (cell.innerText != "") {
        return;
        }
    // cells receive currentPlayer symbol and move is recorded in array //
    if (currentPlayer === playerX) {
        cell.innerText = playerX;
        gameBoard[cellNumber - 1] = playerX;
        currentPlayer = playerO;
        } else {
        cell.innerText = playerO;
        gameBoard[cellNumber - 1] = playerO;
        currentPlayer = playerX;
      }  
    setHoverText(); // running hover function to not hover over filled square //
    checkWinner(); // calling function to make sure the winning line combos  have not been selected //
}
    
function checkWinner() { //checking cells for winning line combos //
    for (const winningLine of winningLines) {
        const { combo} = winningLine;
        const cellValue1 = gameBoard[combo[0] - 1];
        const cellValue2 = gameBoard[combo[1] - 1];
        const cellValue3 = gameBoard[combo[2] - 1];
        if (
          cellValue1 != null &&
          cellValue1 === cellValue2 &&
          cellValue1 === cellValue3
        ) {
          endGameScreen(cellValue1);
          return; //return used here to make sure it does not call a draw if all squares are used to when. //
        }
      }
    const boardFull = gameBoard.every((cell) => cell !== null); // draw situation, full board //
    if (boardFull) {
        endGameScreen(null);
        }
}
// function for end game pop up calling winner and resetting with button. this will make the hidden items on html visible for only these conditions of a game win or a full board. also playing the sound idea I found //
function endGameScreen(endText) {
    let text = "Game is a draw. Play again!";
    if (endText != null) {
        text = `The winner is Player ${endText}!`;
        }
    endGameDiv.className = "visible";
    endGameText.innerText = text;
    gameWonSound.play();
}
// resetting game to keep playing. connected to button with addEventListener. next up will be whoever did not win... so if x won, o starts. //
function startNewGame() {
    endGameDiv.className = "hidden";
    gameBoard.fill(null);
    cells.forEach((cell) => (cell.innerText = ""));
}

})(jQuery);
