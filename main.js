// Begin by drawing the baord, including the start button

let beginBoard;
let startButton = document.getElementById('start')
let rePlay = document.getElementById("replay")
let status = document.getElementById('status')
let form = document.getElementById('form')


// Historical assignments for human and computer, respectively

const playerOne = 'X';
const computerPlayer = 'O';

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
]

const cells = document.querySelectorAll('.cell'); // This should create the board

// Below this line is all game flow ...

startGame();

function startGame() {
    document.querySelector(".endGame").style.display = "none";
// //

    Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', onTurn, false);
    }

startButton.addEventListener('click', function (event) {
    event.target.disabled = true; // disables start button after it is clicked at start of game
    })
}

//****** Event Listener applied to Submit input
target.addEventListener('submit', function (event) {
    event.preventDefault()
    text = document.getElementById('text').value 
    }
)

function onTurn (square) {
    if (typeof beginBoard[square.target.id] === 'number') {
        turn(square.target.id, playerOne)
        if (!isTied()) turn(goodSpot(), computerPlayer);
    }
}

function turn (squareId, player) {

beginBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
        if (itsWon === itsOver(itsWon)) {
        itsWon = isWin(beginBoard, player)
    }
}

function isWin(board, player) {
    let plays = board.reduce((alpha, bravo, charlie) => (bravo === player) ? alpha.concat[charlie] : alpha, []);
    let itsWon = null;
    for (let [index, win] of winConditions.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            itsWon = {
                index: index,
                player: player
            };
            break;
        }
    }
    return itsWon;
}

function itsOver(itsWon) {
    for (let index of winConditions[itsWon.index]) {
        document.getElementbyId(index).backgroundColor =
            itsWon.player === playerOne ? color="cornflowerblue" : color="tomato";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', onTurn, false);
    }
    announceWinner(itsWon.player ===
       playerOne ? "You win! " : "You lose ... ");
}

function announceWinner(whom) {
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = whom;
}

function rePlay() {
    target.addEventListener('click', function (event) {
        event.startButton.disabled = false;
        }
    )
}

function openSquares() {
    return beginBoard.filter(selection => typeof selection === 'number');
}

function goodSpot() {
    return openSquares()[0];
}

function isTied() {
    if (openSquares().length === 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "cyan";
            cells[i].removeEventListener('click', onTurn, false);
        }
        announceWinner("It's a tie!")
            return true;
        }
    return false;
}