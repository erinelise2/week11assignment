(function($, undefined) {
    'use strict'
    //query selector selects all htmnl elements with the class of cell... which are the nine cells that make up the grid.// 
    const cells = document.querySelectorAll(".cell");
    const playerHeader = document.querySelector('.playerMessage'); 
    const playerX = "x"; //player variables... want to make these images //
    const playerO = "o";
    let currentPlayer = playerX;

// setting data index array from cells to note when winning line created. one of the functions below will load cell index for each player and check before next move.//
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
    
// calling sections of html to interact get element by id pulls from id tag in html. byClassName is for class. eventlisteners attach event handlers to an element. the event used in this is the click of either the cells or a button. following click a function is executed.//
    const endGameDiv = document.getElementById("endGame");
    const endGameText = document.getElementById("endGameText");
    const playAgain = document.getElementById("startButton");
    playAgain.addEventListener('click', startNewGame);
    
// something fun I found on a youtube https://www.youtube.com/watch?v=fPew9OI2PnA, so I went and found a sound that works for my page https://soundbible.com/1137-Bubbles.html //
    const gameWonSound = new Audio("sounds/bubbles.wav");
    
// click event listener for when each cell is selected. The hover text was from a youtube and added a little more interactive quality to the board. //
    cells.forEach((cell) => cell.addEventListener("click", gamePlay));
  
// hover cannot stay until clicked. the hover will be whichever current player symbol is.  can only select blank cells to hover over or eventually select. no turning one into the other//
function setHoverText() {
    cells.forEach((cell) => {
        cell.classList.remove("x-hover");
        cell.classList.remove("o-hover");
      });
    const hoverClass = `${currentPlayer}-hover`;
    cells.forEach((cell) => {
        if (cell.innerText == "") {
            cell.classList.add(hoverClass);
            }
      });
    } //end of setHoverText function //
        
setHoverText(); // running hover function at beginning of game/page open //
    
// game play. only empty cells can be selected. cells receive currentPlayer symbol and move is recorded in array  //
function gamePlay(event) {
    if (endGame.classList.contains("visible")) {
        return;
        }
       const cell = event.target;
    const cellNumber = cell.dataset.index;
    if (cell.innerText != "") {
        return;
        }
    if (currentPlayer === playerX) { //switching players. other found method was (x)? x:o//
        cell.innerText = playerX;
        gameBoard[cellNumber - 1] = playerX;
        currentPlayer = playerO;
        playerHeader.textContent = `It is player ${currentPlayer}'s turn!`;
        } else {
        cell.innerText = playerO;
        gameBoard[cellNumber - 1] = playerO;
        currentPlayer = playerX;
        playerHeader.textContent = `It is player ${currentPlayer}'s turn!`;
      }  
    setHoverText(); // running hover function to not hover over filled square inside of playing function//
    checkWinner(); // calling function inside game play to make sure the winning line combos  have not been selected //
    } // end of gamePlay function //
    
//creating check winner function to cells for winning line combos created earlier. arrays are n-1 for location. extracting data from the array: https://www.youtube.com/watch?v=6JsGYEo0vV4&t=0s //
function checkWinner() { 
    for (const winningLine of winningLines) {
        const {combo} = winningLine;
        const cellValue1 = gameBoard[combo[0] - 1];
        const cellValue2 = gameBoard[combo[1] - 1];
        const cellValue3 = gameBoard[combo[2] - 1];
        if (
          cellValue1 != null &&
          cellValue1 === cellValue2 &&
          cellValue1 === cellValue3
        ) {
          endGameScreen(cellValue1);
          return; //return used here to make sure it does not call a draw if all squares are used, but there is a winner. //
        }
      }
    const boardFull = gameBoard.every((cell) => cell !== null); // draw situation, full board //
    if (boardFull) {
        endGameScreen(null);
        }
    } // end of checkWinner function //

// function for end game pop up calling winner and resetting with button. this will make the hidden items on html visible for only these conditions: a game win or a full board. also plays the sound idea I found. the background bubbles are in this hidden div as well, so they will start floating when the window pops up. //
function endGameScreen(endText) {
    let text = "Game is a draw. Play again!";
    if (endText != null) {
        text = `The winner is Player ${endText}!`;
        }
    endGameDiv.className = "visible";
    endGameText.innerText = text;
    gameWonSound.play();
    } // end of endGameScreen function //

// resetting game to keep playing. connected to button with addEventListener. next up will be whoever did not win... so if x won, o starts. if you want x to start every time, you just set the players again like original call.//
function startNewGame() {
    endGameDiv.className = "hidden";
    gameBoard.fill(null);
    cells.forEach((cell) => (cell.innerText = ""));
    } // end of startNewGame function //

})(jQuery);
