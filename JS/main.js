// Global variables

let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let newGame = document.getElementById("newGame");
let playerOne = "X";
let playerTwo = "O";
let computerPlayer = '';
let currentPlayer = playerOne;
let previousPlayer;
let makePlayerName = document.getElementById("playerName");
let submit = document.getElementById('submitButton');
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");

let whosUp = document.getElementById("whosUp");
let provide = document.getElementById('provideStatus');

// Lines 20-23 deal with story(ies) that don't yet work
let seconds = 0;
let modeChoice; 
let timer;
let winner;
// ______________________________________________

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
    cellZero, cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix, cellSeven, cellEight
];


// Getting by with a little help from const
const itsWon = function () { `Player ${currentPlayer} is a winner!` };
const isTied = function () { `It's a tie! Please start a new game.` };
const onTurn = function () { `It's ${currentPlayer}'s turn.` };
// Are lines 12-14 proper usage for template literals?
const provide = document.querySelector('provideStatus');

// This *should* create the board
const cells = document.querySelectorAll('.cell');
// provide.innerHTML = onturn();

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

/* --------------------- Button Event Listeners----------------------- */

onePlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    whosUp.textContent = currentPlayer;
    start();
})

twoPlayerStart.addEventListener("click", () => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    start();
})

submit.addEventListener('click', function (event) {
    if (playerOne !== "") {
        namePlayerOne(event)
    } else {
        namePlayerTwo(event)
    }
    event.preventDefault();
    text = document.getElementById('playerName').value;
})

newGame.addEventListener("click", clicky);

// This should put the current player's click into the proper cell
function useClickedCell(event) {
    
    if (event.target.textContent === "") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            clickedCells.push(event.target);
            currentPlayer = playerTwo;
            previousPlayer = playerOne;
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            clickedCells.push(event.target);
            currentPlayer = playerOne;
            previousPlayer = playerTwo;
        }
    }
    announceWinner();
}

//This will announce the winner when a win condition is met
function announceWinner() {
    console.log("Inside announceWinner!")
    for (let combination of Object.values(winConditions)) {
        if (combination[0].textContent === "") {
        } else if (
            combination[0].textContent === combination[1].textContent &&
            combination[0].textContent === combination[2].textContent
        ) {
            winner = true;
            provide.textContent = previousPlayer + " has WON!";
            
        }
    }   restartGame();
    //isTied();

}

// This will (eventually) allow the player name entered to be tracked

function namePlayerOne(event) {
    if (makePlayerName.value === "") {
        playerOne = "X";
        makePlayerName = "";
    } else {
        playerOne = makePlayerName.value;
        makePlayerName = "";
    }
    console.log(playerOne + " is player one");

}

function namePlayerTwo(event) {
    if (makePlayerName.value === "") {
        playerTwo = "O";
        makePlayerName = "";
    } else {
        playerTwo = makePlayerName.value;
        makePlayerName = "";
    }
    console.log(playerTwo + " is player two");
}

// Provides ability to select the desired game (like in Guess the Number)

function start() {
    cellArray.forEach(function (clicky) {
        clicky.addEventListener("click", useClickedCell);
    });
    timer = setInterval(countItOut, 1000);
    seconds ++
    elapsedTime.textContent = seconds + " have elapsed.";

    // Lines 166-182 deal with a story that does not yet work

    /*if (event.target.id === "twoPlayer") {
        modeChoice = 2;
    } else {
        modeChoice = 1;
        playerTwo = computerPlayer;
    } */
} 

/*function computerGame() {
    let computerClick = clickedCells[Math.floor(Math.random() * cellArray.length)];
    while (clickedCells.includes(computerClick)) {
        computerClick = cellArray[Math.floor(Math.random() * cellArray.length)]
    }
    computerClick.click()
} */

// -------------- Restarts game, clears board, re-enables the start buttons, should allow for new player name input.

function restartGame() {
    gameActive = true;
    currentPlayer = playerOne;
    boardState = ["", "", "", "", "", "", "", "", ""];
    provide.textContent = takePlayerChange();
    onePlayerStart.disabled = false;
    twoPlayerStart.disabled = false;
    document.querySelectorAll('cell').forEach(cell => cell.textContent = ""); 
}