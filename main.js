// !!! Need to fix startButton (it doesn't click) !!!

// !!! Begin by drawing the baord, including the start button !!!

// Global variables
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let startButton = document.getElementById('start');
let rePlay = document.getElementById("replay");
let currentPlayer = 'X';
let form = document.getElementById('form'); // !!! Is this needed? !!!

// Getting by with a little help from const
const itsWon = function() {`Player ${currentPlayer} is a winner!`};
const isTied = function() {`It's a tie! Please start a new game.`};
const onTurn = function() {`It's ${currentPlayer}'s turn.`};
// Are lines 12-14 proper usage for template literals?
const provide = document.querySelector('provideStatus');
const computerPlayer = 'O';
const cells = document.querySelectorAll('.cell'); // This *should* create the board

provide.innerHTML = onTurn();


// These win conditions have remained so throughout the ages. Anyone hear Gregorian chanting?

const winConditions = [
    [0, 1, 2], // row
    [3, 4, 5], // row
    [6, 7, 8], // row
    [0, 3, 6], // column
    [1, 4, 7], // column
    [2, 5, 8], // column
    [0, 4, 8], // diagonal
    [6, 4, 2]  // diagonal
];

// This should put the current player's click into the proper cell

function useClickedCell(whatClicked, cellIndex) {
    boardState[cellIndex] = playerOne;
    whatClicked.innerHTML = playerOne;
}

// This should allow for the current player to swap between currentPlayer and computerPlayer

function takePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    provide.innerHTML = onTurn();
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
        provide.innerHTML = itsWon();
        gameActive = false;
        return;
    }

    let itsTied = !boardState.includes("");

    if (itsTied) {
        provide.innerHTML = isTied();
        gameActive = false;
        return;
    }
    takePlayerChange();
}

function makeCellClicked(clickCell) {
    const clickCell = clickCell.target;
    const clickedCellIndex = parseInt(whatClicked.getAttribute("cell-index"));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    useClickedCell(clickCell, clickedCellIndex);
    giveResults();

}

function restartGame() {
    boardState = true;
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    provide.innerHTML = takePlayerChange();
    document.querySelectorAll('cell').forEach(cell => cell.innerHTML = "")
    
}

document.querySelectorAll("cell").forEach(cell => cell.addEventListener("click", makeCellClicked));
document.querySelector("replay").addEventListener("click", restartGame);


/*target.addEventListener('submit', function (event) {
    event.preventDefault()
    text = document.getElementById('text').value 
    }
) */