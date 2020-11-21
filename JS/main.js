// Global variables

let gameActive = true;
let newGame = document.getElementById("newGame");
let playerOne = "X";
let playerTwo = "O";
//let computerPlayer = '';
let currentPlayer = playerOne;
let previousPlayer;
let makePlayerName = document.getElementById("playerName");
let submit = document.getElementById('submitButton');
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");

let whosUp = document.getElementById("whosUp");
let gameWinner = document.getElementById('winStatus');

// Lines 20-23 deal with story(ies) that don't yet work
let seconds = 0;
let modeChoice; 
let timer;
let winner;
let elapsedTime = document.getElementById("time-elapsed")
// ______________________________________________

// Board Structure
let cellOne = document.getElementById("cell-1");
let cellTwo = document.getElementById("cell-2");
let cellThree = document.getElementById("cell-3");
let cellFour = document.getElementById("cell-4");
let cellFive = document.getElementById("cell-5");
let cellSix = document.getElementById("cell-6");
let cellSeven = document.getElementById("cell-7");
let cellEight = document.getElementById("cell-8");
let cellNine = document.getElementById("cell-9");

let clickedCells = [];
let cellArray = [
    cellOne, cellTwo, cellThree, cellFour, cellFive, cellSix, cellSeven, cellEight, cellNine
];

// This shows that a tie condition has been met
const isTied = function () { `It's a tie! Please start a new game.` };

// This *should* create the board
const cells = document.querySelectorAll('.cell');
// provide.innerHTML = onturn();

// These win conditions have remained so throughout the ages. Anyone hear Gregorian chanting?

const winConditions = {
    rowOne: [cellOne, cellTwo, cellThree], // row
    rowTwo: [cellFour, cellFive, cellSix], // row
    rowThree: [cellSeven, cellEight, cellNine], // row
    columnOne: [cellOne, cellFour, cellSeven], // column
    columnTwo: [cellTwo, cellFive, cellEight], // column
    columnThree: [cellThree, cellSix, cellNine], // column
    forwardSlash: [cellOne, cellFive, cellNine], // diagonal
    backSlash: [cellSeven, cellFive, cellThree]  // diagonal
};

/* --------------------- Button Event Listeners----------------------- */

onePlayerStart.addEventListener("click", (event) => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    whosUp.textContent = currentPlayer;
    start(event);
})

twoPlayerStart.addEventListener("click", (event) => {
    onePlayerStart.disabled = true;
    twoPlayerStart.disabled = true;
    whosUp.textContent = currentPlayer;
    start(event);
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

//newGame.addEventListener("click", eachCell);

// Provides ability to select the desired game (like in Guess the Number)
function start(event) {
    cellArray.forEach(function (eachCell) {
        eachCell.addEventListener("click", useClickedCell);
    });
    //timer = setInterval(countItOut, 1000);
    //seconds ++
    //elapsedTime.textContent = seconds + " have elapsed.";
    console.log(event.target);
    if (event.target.id === "twoPlayer") {
        modeChoice = "twoPlayer";
    } else {
        modeChoice = "onePlayer";
    }
} 

// Restarts game, clears board, re-enables the start buttons, should allow for new player name input.
function stopGame(cellArray) {
    cellArray.forEach(function (cell) {
        cell.removeEventListener("click", useClickedCell)
    })
    onePlayerStart.disabled = false;
    twoPlayerStart.disabled = false;
}

/*function computerGame() {
    let computerClick = clickedCells[Math.floor(Math.random() * cellArray.length)];
    while (clickedCells.includes(computerClick)) {
        computerClick = cellArray[Math.floor(Math.random() * cellArray.length)]
    }
    computerClick.click()
} */

// This should put the current player's click into the proper cell
function useClickedCell(event) {
    if (modeChoice === "twoPlayer") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            clickedCells.push(event.target);
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            clickedCells.push(event.target);
        }
    } else if (modeChoice === "onePlayer") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            clickedCells.push(event.target);
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            clickedCells.push(event.target);
        }   
    }
    switchPlayer();
    removeClickedCell(event);
    announceWinner();
}

// function for switching the player turn
function switchPlayer() {
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
        whosUp.textContent = currentPlayer;
    } else if (currentPlayer === playerTwo) {
        currentPlayer = playerOne;
        whosUp.textContent = currentPlayer;
    }
}

// function to prevent overwriting an already-filled cell and tell player to pick a different cell
function removeClickedCell(event) {
    event.target.removeEventListener("click", useClickedCell);
    event.target.addEventListener("click", () => {
        alert("Please click a different cell!")
    })
}

// This will announce the winner when a win condition is met
function announceWinner() {
    console.log("Inside announceWinner!")
    for (let combination of Object.values(winConditions)) {
        if (combination[0].textContent === "") {
        } else if (
            combination[0].textContent === combination[1].textContent &&
            combination[0].textContent === combination[2].textContent
        ) {
            winner = true;
            showWinner();
            gameWinner.textContent = previousPlayer + " has WON!";
            stopGame(cellArray);
        }
    }
    //isTied();

}

// Function to highlight the winning condition
function showWinner(winArray) {
    winArray.forEach(function(winCells) {
        winCells.className = "winner";
    })
}

// function to show a tie condition has been met ...


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

