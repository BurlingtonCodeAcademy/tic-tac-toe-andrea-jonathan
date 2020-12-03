// Global variables
let gameActive = true;
let playerOne = "X";
let playerTwo = "O";
let currentPlayer = playerOne;
let previousPlayer = currentPlayer;
let playerOneName = document.getElementById("playerNameX");
let playerTwoName = document.getElementById("playerNameO");
let submit = document.getElementById("submitButton");
let onePlayerStart = document.getElementById("onePlayer");
let twoPlayerStart = document.getElementById("twoPlayer");
let resetGame = document.getElementById("newGame");
let whosUp = document.getElementById("whosUp");
let gameWinner = document.getElementById("winStatus");
let seconds = 0;
let modeChoice;
let timer;
let winner;
let elapsedTime = document.getElementById("time-elapsed");

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

// As each cell is clicked, it's pushed into this empty array
let clickedCells = [];

//This array is used to track clicked cells to prevent overwriting their content
let cellArray = [
  cellOne,
  cellTwo,
  cellThree,
  cellFour,
  cellFive,
  cellSix,
  cellSeven,
  cellEight,
  cellNine,
];

// This helps create the game board
const cells = document.querySelectorAll(".cell");

// Win Conditions
const winConditions = {
  rowOne: [cellOne, cellTwo, cellThree], // row
  rowTwo: [cellFour, cellFive, cellSix], // row
  rowThree: [cellSeven, cellEight, cellNine], // row
  columnOne: [cellOne, cellFour, cellSeven], // column
  columnTwo: [cellTwo, cellFive, cellEight], // column
  columnThree: [cellThree, cellSix, cellNine], // column
  forwardSlash: [cellOne, cellFive, cellNine], // diagonal
  backSlash: [cellSeven, cellFive, cellThree], // diagonal
};

// Button Event Listeners

onePlayerStart.addEventListener("click", (event) => {
  onePlayerStart.disabled = true;
  twoPlayerStart.disabled = true;
  whosUp.textContent = playerOne;
  start(event);
});

twoPlayerStart.addEventListener("click", (event) => {
  onePlayerStart.disabled = true;
  twoPlayerStart.disabled = true;
  whosUp.textContent = playerOne;
  currentPlayer = playerOne;
  start(event);
});

submit.addEventListener("click", function (event) {
  event.preventDefault();
  namePlayerOne();
  namePlayerTwo();
});

resetGame.addEventListener("click", function () {
  onePlayerStart.disabled = false;
  twoPlayerStart.disabled = false;
  resetBoard(cellArray)
});

// Provides ability to choose the desired game mode & starts timer at beginning of game
// In order to only have players be X and O (no names entered), the name input fields must be left blank when Submit is clicked
function start(event) {
  cellArray.forEach(function (eachCell) {
    eachCell.addEventListener("click", useClickedCell);
  });
  timer = setInterval(gameTimer, 1000);

  if (event.target.id === "twoPlayer") {
    modeChoice = "twoPlayer";
  } else {
    modeChoice = "onePlayer";
    playerTwo = 'computer';
  }
}

// Removes the click-ability from each cell
function stopGame(cellArray) {
  cellArray.forEach(function (cell) {
    cell.removeEventListener("click", useClickedCell);
  });

}

// Clears the board when a new game is begun, after prior game has finished
function resetBoard(cellArray) {
  cellArray.forEach(function (cell) {
    cell.textContent = ''
    cell.className = "cell"
    cell.removeEventListener("click", addAlert)
  })
  seconds = 0
  elapsedTime.textContent = ""
  gameWinner.textContent = ""
  whosUp.textContent = playerOne
  currentPlayer = playerOne
  clickedCells = []
  winner = false
}

// Allows for human vs computer mode (one human)
function computerPlayer() {
  let computerClick = cellArray[Math.floor(Math.random() * cellArray.length)];
  while (clickedCells.includes(computerClick)) {
    computerClick = cellArray[Math.floor(Math.random() * cellArray.length)]
  }
  computerClick.click()
}

// Puts the current player's click on the selected cell
function useClickedCell(event) {
  // Allows for X or O content (whether named humans or not, or human vs computer) within a cell
  if (currentPlayer === playerOne) {
    event.target.textContent = "X";
    clickedCells.push(event.target);
  } else if (currentPlayer === playerTwo) {
    event.target.textContent = "O";
    clickedCells.push(event.target);
  }
  announceWinner();
  switchPlayer();
  removeClickedCell(event);
  if (modeChoice === "onePlayer" && currentPlayer === playerTwo) {
    computerPlayer()
  }
}

// Switches the player turn
function switchPlayer() {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    whosUp.textContent = currentPlayer;
  } else if (currentPlayer === playerTwo) {
    currentPlayer = playerOne;
    whosUp.textContent = currentPlayer;
  }
}

// Prevents overwriting an already-filled cell and tell player to pick a different cell
function removeClickedCell(event) {
  event.target.removeEventListener("click", useClickedCell);
  event.target.addEventListener("click", addAlert);
}

function addAlert() {
  alert("Please click a different cell!");
}

// Announces the winner when a win condition is met
function announceWinner() {
  for (let combination of Object.values(winConditions)) {
    if (combination[0].textContent === "") {
    } else if (
      combination[0].textContent === combination[1].textContent &&
      combination[0].textContent === combination[2].textContent
    ) {
      winner = true;
      showWinner(combination);
      gameWinner.textContent = currentPlayer + " has WON!";
      stopGame(cellArray);
      stopGameTimer()
    }
  }
  isTied();
}

// Highlights the winning condition in an obvious, contrasting color
function showWinner(combination) {
  combination.forEach(function (winConditions) {
    winConditions.className = "winner";
  });
}

// Shows that a tie game has occurred (no color change on the cells)
function isTied() {
  if (clickedCells.length === 9 && !winner) {
    gameWinner.textContent = " Oops! It's a draw. Please click New Game."
    stopGame(cellArray);
    stopGameTimer()
  }
}

// Allows the human player names entered to be tracked
function namePlayerOne() {
  if (playerOneName.value === "") {
    playerOne = "X";
  } else {
    playerOne = playerOneName.value;
    playerOneName.value = "";
  }
}

function namePlayerTwo() {
  if (playerTwoName.value === "") {
    playerTwo = "O";
  } else {
    playerTwo = playerTwoName.value;
    playerTwoName.value = "";
  }
}

// Starts the game timer at the start of a new game
function gameTimer() {
  seconds += 1;
  if (seconds < 10) {
    elapsedTime.textContent = "0" + seconds + " seconds have elapsed";
  } else {
    elapsedTime.textContent = seconds + " seconds have elapsed";
  }

}

// Stops the game timer when a game ends
function stopGameTimer() {
  clearInterval(timer)
}