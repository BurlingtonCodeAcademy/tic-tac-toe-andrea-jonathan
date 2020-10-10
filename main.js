// !!! Need to fix startButton (it doesn't click) !!!

// !!! Begin by drawing the baord, including the start button !!!

// Global variables
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let rePlay = document.getElementById("replay");
let playerOne = "X";
let playerTwo = "O";
let currentPlayer = playerOne;
let form = document.getElementById('form'); // !!! Is this needed? !!!
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");
let whosUp = document.getElementById("whosUp");

let cellZero = document.getElementById("cell-0");
let cellOne = document.getElementById("cell-1");
let cellTwo = document.getElementById("cell-2");
let cellThree = document.getElementById("cell-3");
let cellFour = document.getElementById("cell-4");
let cellFive = document.getElementById("cell-5");
let cellSix = document.getElementById("cell-6");
let cellSeven = document.getElementById("cell-7");
let cellEight = document.getElementById("cell-8");

//

let cellArray = [
    cellZero, cellOne, cellTwo, cellFour, cellFive, cellSix, cellSeven, cellEight
];


// Getting by with a little help from const
const itsWon = function() {`Player ${currentPlayer} is a winner!`};
const isTied = function() {`It's a tie! Please start a new game.`};
const onTurn = function() {`It's ${currentPlayer}'s turn.`};
// Are lines 12-14 proper usage for template literals?
const provide = document.getElementById('provideStatus');
//const computerPlayer = 'O';
const cells = document.getElementById('board'); // This *should* create the board?

// provide.innerHTML = onTurn();


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

// This should put the current player's click into the proper cell

function useClickedCell(whatClicked, cellIndex) {
    boardState[cellIndex] = playerOne;
    whatClicked.textContent = playerOne;
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

// This should allow for the current player to swap between currentPlayer and computerPlayer

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

function giveResults() {
    let isWin = false;
    for (let i = 0; i < cells.length; i++) {
        const winCondition = winConditions[i];
        let alpha = boardState[winCondition[0]];
        let bravo = boardState[winCondition[1]];
        let charlie = boardState[winCondition[2]];

        if (alpha === "" || bravo === "" || charlie === "") {
            continue;
        }
        if (alpha === bravo && bravo === charlie) {
            isWin = true;
            break;
        }
    }

    if (isWin) { // Is this too close to variable shadowing?
        provide.textContent = itsWon();
        gameActive = false;
        return;
    }

    let itsTied = !boardState.includes("");

    if (itsTied) {
        provide.textContent = isTied();
        gameActive = false;
        return;
    }
    takePlayerChange();
}

/*function makeCellClicked(clickCell) {
    const clickCell = clickCell.target;
    const clickedCellIndex = parseInt(whatClicked.getElementsByClassName("cell"));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    useClickedCell(clickCell, clickedCellIndex);
    giveResults();

} */

function restartGame() {
    gameActive = true;
    currentPlayer = playerOne;
    boardState = ["", "", "", "", "", "", "", "", ""];
    provide.textContent = takePlayerChange();
    onePlayerStart.disabled = false;
    twoPlayerStart.disabled = false;
    document.querySelectorAll('cell').forEach(cell => cell.textContent = "")
    
}

document.querySelectorAll("cell").forEach(cell => cell.addEventListener("click", makeCellClicked));
// document.querySelector("replay").addEventListener("click", restartGame);


/*target.addEventListener('submit', function (event) {
    event.preventDefault()
    text = document.getElementById('text').value 
    }
) */

/* ----- GJ - REFERENCE ONLY! DO NOT COPY DIRECTLY
function fillSquare(event) {
    if (gameMode === "twoPlayer") {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            usedCellArray.push(event.target);
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            usedCellArray.push(event.target);
        }
    } else if (gameMode === 'onePlayer') {
        if (currentPlayer === playerOne) {
            event.target.textContent = "X";
            usedCellArray.push(event.target)
            if (usedCellArray.length < 9) {
                computer()
            }
        } else if (currentPlayer === playerTwo) {
            event.target.textContent = "O";
            usedCellArray.push(event.target);
        }
    }
    declareWinner();
    switchPlayer()
    removeFillSquare(event);
}*/

/* ------- GJ FOR REFERENCE ONLY!!!
function incrementSeconds() {
    seconds += 1;
    if (seconds < 10) {
        gameTimer.textContent = "0" + seconds;
    } else {
        gameTimer.textContent = seconds;
    }
} */