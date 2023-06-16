// variables to get the game going //
let gamePlay = {
    x_animals: 'x', 
    y_animals: 'y',
    playerTurn: undefined,
    gameWinner: null,
    selectedCharacter: document.querySelectorAll('.img .id'),
    cellElements: document.querySelectorAll('[data-cell'),
    boardElements: document.getElementById('board'),
    startButton: document.getElementById('startButton'),
    startWindow: document.querySelector('.open-game'),
    winE1: document.querySelector(".winner-msg"),
    drawE1: document.querySelector('.draw-msg'),
    winnerImage : document.querySelector(".winner-msg .winner"),
    restartButton: document.getElementById("restartBtn"),
    drawButton: document.getElementById("drawBtn"),
}

// user selection of animal character to play //

function playerProfile() {
    gamePlay.selectedProfile.forEach(img => {
       img.addEventListener("click", e => {
           let target = e.target.dataset.id;
           removeImgSelection(gamePlay.selectedProfile);
           document.querySelector(`[data-id='${target}']`).classList.add("selected");
        if (target == 'x2' || target == 'y2'){
            gamePlay.x_animals = "x2",
            gamePlay.y_animals = "y2";
        }
        gamePlay.turn = target == 'y' || target == 'y2' ? true : false;
       });
    });
}

function removeImgSelection(img){
    [].forEach.call(img, function(el){
        el.classList.remove("selected");
    })
}

function setHoverEffect(){
    gamePlay.boardElements.classList.remove(gamePlay.x_animals);
    gamePlay.boardElements.classList.remove(gamePlay.y_animals);
    if (gamePlay.turn){
        gamePlay.boardElements.classList.add(gamePlay.y_animals);
    }else{
        gamePlay.boardElements.classList.add(gamePlay.x_animals);
    }
}


function markCell(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(turn){
    return turn =! turn;
}

function endGame(draw, winEl, drawEl){
    if (!draw){
        winEl.classList.add("show");
    }else{
        drawEl.classList.add("show");
    }
}

function isDraw(flag){
    if (flag.length) return;
    return [...gamePlay.blockElements].every(cell => {
        return cell.classList.contains(gamePlay.x_animals) ||
        cell.classList.contains(gamePlay.y_animals)
    })
}

const winningLines = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 8]
];

function checkWin(currentClass, cellElements){
    let winGame = [];

    winningLines.some(combination => {
        winGame.push(combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        }));
    })
    return winGame || null;
}

// buttons //
gamePlay.startButton.addEventListener("click", startGame);
gamePlay.restartButton.addEventListener("click", startGame);
gamePlay.drawButton.addEventListener("click", startGame);

playerProfile()

function startGame() {
    setHoverEffect();
    gamePlay.cellElements.forEach(cell => {
        cell.classList.remove(gamePlay.x_animals);
        cell.classList.remove(gamePlay.y_animals);
        cell.classList.remove("win")
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true})
    })

    gamePlay.startWindow.classList.add("hide");
    gamePlay.winE1.classList.remove("show");
    gamePlay.drawE1.classList.remove("show");
    gamePlay.winnerImage.children.length ? gamePlay.winnerImage.removeChild(gamePlay.winner) : null;
}

function handleClick(e){
    const cell = e.target;
    const currentClass = gamePlay.turn ? gamePlay.y_animals : gamePlay.x_animals;
    markCell(cell, currentClass);

    /** check winner */
    let flag = checkWin(currentClass, gamePlay.blockElements).filter((win, index) => {
       if (win){
        winningLines[index].map(i => {
            gamePlay.blockElements[i].classList.add('win');
        })

        gamePlay.winner = gamePlay.blockElements[winningLines[index][0]].cloneNode(true);
        return win !== false;
       }
    });
    
    if (flag.length){
        endGame(false, gamePlay.winEl, gamePlay.drawEl);
        gamePlay.winnerImage.append(GAME.winner);
    }else if(isDraw(flag)){
       endGame(true, gamePlay.winEl, gamePlay.drawEl);
    }

    gamePlay.turn = swapTurns(gamePlay.turn);
    setHoverEffect();
}


// const cells = document.querySelectorAll(".cell"); //console.log(cells)
// const currentStatus = document.querySelector("#currentStatus");
// const startButton = document.querySelector("#startButton"); 

// let gameBoard = ['','','','','','','','',''];
// let currentPlayer = 'X';
// let gamePlay = false;

// startGame ();

// function startGame() {
//     cells.forEach((cell) => cell.addEventListener('click', cellClicked));
//     startButton.addEventListener('click', restartGame);
//     currentStatus.textContent = `It is ${currentPlayer}'s turn`;
//     gamePlay = true;
// }

// function cellClicked() {
//     const cellIndex = this.getAttribute("cellIndex");
//     if(gameBoard[cellIndex]!= '' || !gamePlay){
//     return;
// }
//     updateCell(this, cellIndex);
//     checkWinner();
//     this.classList.add("animate");
// }

// function updateCell(cell, index) {
//     cell.textContent = currentPlayer;
//     cellOptions[index] = currentPlayer;
// }

// function changePlayers() {
//     currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
//     currentStatus.textContent = `It is ${currentPlayer}'s turn`;
// }

// function verifyWinner() {
//     const winningLines= [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ];
//     if(winningLines.includes("XXX")) {
//         delcareWinner();
//     }else if (winningLines.includes("OOO")) {
//         delcareWinner();
//     }else if (winningLines.includes("")) {
//         currentStatus.textContent = `Game is a Draw`;
//         gamePlay=false;
//     } else {
//         changePlayers();
//     }
// }

// function delcareWinner() {
//     currentStatus.textContent = `$(currentPlayer) is the winner!`;
//     gamePlay = false;
// }

// function restartGame() {
//     location.reload();
//     startGame;
// }

// // element from war game to prompt player names
// //     startGame() {
// //     // To create two new players
// //         this.player1 = new Player (prompt('Enter Name for Player One: '));
// //         this.player2 = new Player (prompt('Enter Name for Player Two: '));
// //     }

