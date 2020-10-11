// Global variables
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let rePlay = document.getElementById("replay");
let playerOne = "X";
let playerTwo = "O";
let computerPlayer = '';
let currentPlayer = playerOne;
let form = document.getElementById('form');
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");
let playerVsPlayer = document.getElementById("twoPlayers");
let playerVsComputer = document.getElementById("singlePlayer")
//let whosUp = document.getElementById("whosUp");
let provide = document.getElementById('provideStatus');
let modeChoice;
let timer;
let winner; // !!! Should winner start as null? !!!
let useClickedCell = document.querySelectorAll("cell").forEach(cells => cells.addEventListener("click", useClickedCell));
// !!! Line 19 doesn't work. Need to write it differently !!!

// Board Structure
let cellZero = document.getElementById("cell-0");
let cellOne = document.getElementById("cell-1");
let cellTwo = document.getElementById("cell-2");
let cellThree = document.getElementById("cell-3");
let cellFour = document.getElementById("cell-4");
let cellFive = document.getElementById("cell-5");
let cellSix = document.getElementById("cell-6");
let cellSeven = document.getElementById("cell-7");
let cellEight = document.getElementById("cell-8");


let clickedCells = [];
let cellArray = [
    cellZero, cellOne, cellTwo, cellFour, cellFive, cellSix, cellSeven, cellEight
];


// Getting by with a little help from const
const itsWon = function() {`Player ${currentPlayer} is a winner!`};
const isTied = function() {`It's a tie! Please start a new game.`};
const onTurn = function() {`It's ${currentPlayer}'s turn.`};
// Are lines 12-14 proper usage for template literals?
// !!! Figure out if 41-43 are actually needed or can be changed !!!

const cells = document.getElementById('board'); // This *should* create the board


// These win conditions have remained so throughout the ages. Anyone hear Gregorian chanting?

const winConditions = {
    rowOne: [cellZero, cellOne, cellTwo], // row
    rowTwo: [cellThree, cellFour, cellFive], // row
    rowThree: [cellSix, cellSeven, cellEight], // row
    columnOne: [cellZero, cellThree, cellSix], // column
    columnTwo: [cellOne, cellFour, cellSeven], // column
    columnThree: [cellTwo, cellFive, cellEight], // column
    forwardSlash: [cellZero, cellFour, cellEight], // diagonal
    backSlash: [cellSix, cellFour, cellTwo]  // diagonal
};

function annouceWinner() {
    for (let combination of Object.values(winConditions)) {
        if (combination[0].textContent === "") {
        } else if (
            combination[0].textContent === combination[1].textContent &&
            combination[0].textContent === combination[2].textContent
        ) {
            winner = true;
            annouceWinner(combination);
            provide.textContent = currentPlayer + " has WON!";
        }
    }
    isTied();


} // !!! We need to do these things, but a bit differently

// This should put the current player's click into the proper cell

function useClickedCell(event) {
    if (modeChoice === "playerVsPlayer") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            clickedCells.push(event.target);
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            clickedCells.push(event.target);
        }
    } else if (modeChoice === 'playerVsComputer') {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            clickedCells.push(event.target)
            if (clickedCells.length < 9) {
                computerGame()
            }
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            clickedCells.push(event.target);
        }
    }
    //announceWinner();
    //takePlayerChange();
}

// Provide ability to select the desired game (like in Guess the Number)
function start(event, cellArray) {
    cellArray.forEach(function (whatsClicked) {
        whatsClicked.addEventListener("click", useClickedCell);
    });
    timer = setInterval(countItOut, 1000);
    if (event.target.id === "playerVsPlayer") {
        modeChoice = "playerVsPlayer";
    } else {
        modeChoice = "singlePlayer";
        playerTwo = computerPlayer;
    }
}

function computerGame() {
    let computerClick = clickedCells[Math.floor(Math.random() * cellArray.length)];
    while (clickedCells.includes(computerClick)) {
        computerClick = cellArray[Math.floor(Math.random() * cellArray.length)]
    }
    computerClick.click()
}
/* --------------------- Player Buttons ----------------------- */

onePlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
})

twoPlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
})

target.addEventListener('submit', function (event) { // !!! This still isn't storing and displaying the player's name !!!
    event.preventDefault();
    text = document.getElementById('playerName').value;
    }
)

// This should allow for the game to swap between players

function takePlayerChange() {
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
        whosUp.textContent = currentPlayer;
    } else if (currentPlayer === playerTwo) {
        currentPlayer = playerOne;
        whosUp.textContent = currentPlayer;
    }

    provide.textContent = onTurn();
}

// -------------- Restarts game, clears board, re-enables the start buttons, should allow for new player name input.
function restartGame() {
    gameActive = false;
    currentPlayer = playerOne;
    boardState = ["", "", "", "", "", "", "", "", ""];
    provide.textContent = takePlayerChange(); // !!! This doesn't look right !!!
    onePlayerStart.disabled = false;
    twoPlayerStart.disabled = false;
    document.querySelectorAll('cell').forEach(cell => cell.textContent = "");
    document.querySelector("replay").addEventListener("click", restartGame);
    // !!! Having trouble with this. !!!
    /* !!! When restart button is clicked, it should re-enable onePlayerStart & twoPlayerStart, clear board, allow for new player name but doesn't. !!! */
}