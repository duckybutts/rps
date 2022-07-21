let playing = true;
let choices = ["rock", "paper", "scissors"];
let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let round = 1;
let roundTxt = document.querySelector(".roundNum");
let scorePlayer = 0;
let scorePlayerTxt = document.querySelector(".playerScore");
let scoreComputerTxt = document.querySelector(".computerScore");
let scoreComp = 0;
let resultsTxt = document.querySelector(".resultsTxt");
let playerChoice;
let restart = document.querySelector(".restart");
let next = document.querySelector(".next");

getPlayerChoice(); //  allows input from player to begin game

function getPlayerChoice() {
  playerClick();

  function playerClick() {
    rock.addEventListener("click", function () {
      if (playing) {
        playerChoice = "rock";
        match();
        rock.classList.add("selected");
        paper.classList.add("unSelected");
        scissors.classList.add("unSelected");
      }
    });
    paper.addEventListener("click", function () {
      if (playing) {
        playerChoice = "paper";
        match();
        rock.classList.add("unSelected");
        paper.classList.add("selected");
        scissors.classList.add("unSelected");
      }
    });
    scissors.addEventListener("click", function () {
      if (playing) {
        playerChoice = "scissors";
        match();
        rock.classList.add("unSelected");
        paper.classList.add("unSelected");
        scissors.classList.add("selected");
      }
    });
  }
}

// calc computer choice
let getComputerChoice = () => {
  let i = Math.floor(Math.random() * choices.length);
  return choices[i];
};
let computerChoice = getComputerChoice();

//plays rps
function match() {
  computerChoice = getComputerChoice();
  if (playerChoice == computerChoice) {
    draw();
  } else if (
    (playerChoice == "rock" && computerChoice == "scissors") ||
    (playerChoice == "paper" && computerChoice == "rock") ||
    (playerChoice == "scissors" && computerChoice == "paper")
  ) {
    win();
  } else if (
    (computerChoice == "rock" && playerChoice == "scissors") ||
    (computerChoice == "paper" && playerChoice == "rock") ||
    (computerChoice == "scissors" && playerChoice == "paper")
  ) {
    lose();
  }
}

let win = function () {
  scorePlayer++;
  resultsTxt.textContent = `You won! ${playerChoice} beats ${computerChoice}`;
  resultsTxt.style.color = "#4BA65C";
  checkWinner();
  playing = false;
  scorePlayerTxt.textContent = scorePlayer;
};
let lose = function () {
  scoreComp++;
  resultsTxt.textContent = `You lost ${computerChoice} beats ${playerChoice}`;
  resultsTxt.style.color = "#C55858";
  checkWinner();
  playing = false;
  scoreComputerTxt.textContent = scoreComp;
};
let draw = function () {
  resultsTxt.textContent = `It's a tie. You both chose ${playerChoice}`;
  resultsTxt.style.color = "black";
  playing = false;
};

//Ensures player cannot increase round # without playing
next.addEventListener("click", function () {
  if (!playing) {
    nextRound();
  }
});

//Ensures player cannot go to next round before making a selection
function nextRound() {
  if (playing) {
    round++;
  }
  reset();
}
//Resets UI saves score
function reset() {
  checkWinner();
  getPlayerChoice();
  roundTxt.textContent = round;
  resultsTxt.textContent = "";
  rock.classList.remove("unSelected", "selected");
  paper.classList.remove("unSelected", "selected");
  scissors.classList.remove("unSelected", "selected");
  document.querySelector(".content").style.backgroundColor = "white";
}

//Resets UI deletes score
restart.addEventListener("click", function () {
  round = 1;
  scorePlayer = 0;
  scoreComp = 0;
  scorePlayerTxt.textContent = scorePlayer;
  scoreComputerTxt.textContent = scoreComp;
  reset();
});

function checkWinner() {
  if (scorePlayer >= 5 || scoreComp >= 5) {
    gameOver();
  } else {
    playing = true;
  }
}
//display gameover screen
function gameOver() {
  playing = false;
  roundTxt.textContent = "Game Over";
  roundTxt.style.fontSize = "xx-large";
  if (scorePlayer > scoreComp) {
    resultsTxt.textContent = 'You won! Press "restart" to play again!';
    resultsTxt.style.color = "#4BA65C";
  } else {
    resultsTxt.textContent = 'You lost. Press  "restart" to try again.  ';
    resultsTxt.style.color = "#C55858";
  }
}
