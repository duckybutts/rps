let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let restart = document.querySelector(".restart");
let next = document.querySelector(".next");
let roundTxt = document.querySelector(".roundNum");
let resultsTxt = document.querySelector(".resultsTxt");
let scorePlayerTxt = document.querySelector(".playerScore");
let scoreComputerTxt = document.querySelector(".computerScore");
let round = 1;
let scorePlayer = 0;
let scoreComp = 0;
let choices = ["rock", "paper", "scissors"];
let playing = true;
let playerChoice;

getPlayerChoice();

function getPlayerChoice() {
  playerClick();

  function playerClick() {
    rock.addEventListener("click", function () {
      if (playing) {
        playerChoice = "rock";
        match("rock");
        rock.classList.add("selected");
        paper.classList.add("unSelected");
        scissors.classList.add("unSelected");
      }
    });
    paper.addEventListener("click", function () {
      if (playing) {
        playerChoice = "paper";
        match("paper");
        rock.classList.add("unSelected");
        paper.classList.add("selected");
        scissors.classList.add("unSelected");
      }
    });
    scissors.addEventListener("click", function () {
      if (playing) {
        playerChoice = "scissors";
        match("scissors");
        rock.classList.add("unSelected");
        paper.classList.add("unSelected");
        scissors.classList.add("selected");
      }
    });
    return playerChoice;
  }
  return playerChoice;
}

// console.log(playerChoice);

let getComputerChoice = () => {
  let i = Math.floor(Math.random() * choices.length);
  return choices[i];
};

let computerChoice = getComputerChoice();

function match(player) {
  computerChoice = getComputerChoice();
  if (player == computerChoice) {
    draw();
  } else if (
    (playerChoice == "rock" && computerChoice == "scissors") ||
    (playerChoice == "paper" && computerChoice == "rock") ||
    (playerChoice == "scissors" && computerChoice == "paper")
  ) {
    win();
  } else if (
    (computerChoice == "rock" && player == "scissors") ||
    (computerChoice == "paper" && player == "rock") ||
    (computerChoice == "scissors" && player == "paper")
  ) {
    lose();
  }
}

let win = function () {
  scorePlayer++;
  checkWinner();
  resultsTxt.textContent = `You won! ${playerChoice} beats ${computerChoice}`;
  resultsTxt.style.color = "#4BA65C";
  playing = false;
  scorePlayerTxt.textContent = scorePlayer;
};
let lose = function () {
  scoreComp++;
  checkWinner();
  resultsTxt.textContent = `You lost ${computerChoice} beats ${playerChoice}`;
  resultsTxt.style.color = "#C55858";
  playing = false;
  scoreComputerTxt.textContent = scoreComp;
  return scoreComp;
};
let draw = function () {
  resultsTxt.textContent = `It's a tie. You both chose ${playerChoice}`;
  resultsTxt.style.color = "black";
  playing = false;
};

// chosen = true;
// console.log(chosen);

function nextRound() {
  if (playing) {
    round++;
  }
  reset();
}

next.addEventListener("click", function () {
  if (!playing) {
    nextRound();
  }
});

restart.addEventListener("click", function () {
  round = 1;
  scorePlayer = 0;
  scoreComp = 0;
  scorePlayerTxt.textContent = scorePlayer;
  scoreComputerTxt.textContent = scoreComp;
  reset();
});

function reset() {
  checkWinner();
  getPlayerChoice();
  roundTxt.textContent = round;
  resultsTxt.textContent = "";
  playerChoice = undefined;
  computerChoice = undefined;
  rock.classList.remove("unSelected", "selected");
  paper.classList.remove("unSelected", "selected");
  scissors.classList.remove("unSelected", "selected");
  document.querySelector(".content").style.backgroundColor = "white";
}

function checkWinner() {
  if (scorePlayer >= 2 || scoreComp >= 2) {
    playing = false;
  } else {
    playing = true;
  }
}
