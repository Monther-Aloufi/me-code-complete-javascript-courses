"use strict";

//Game object
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let player, currentScore, totalScore, keepPlaying;

//create new game
const createNewGame = function () {
  player = 0;
  currentScore = 0;
  totalScore = [0, 0];
  keepPlaying = true;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};
//disable button function
const disableBtn = function () {
  document.querySelector(".btn--roll").classList.add("disable");
  setTimeout(() => {
    document.querySelector(".btn--roll").classList.remove("disable");
  }, 700);

  document.querySelector(".btn--hold").classList.add("disable");
  setTimeout(() => {
    document.querySelector(".btn--hold").classList.remove("disable");
  }, 700);
};

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;

  document
    .querySelector(`.player--${player}`)
    .classList.remove("player--active");

  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add("player--active");
  currentScore = 0;

  //   document.querySelector(".btn--roll").classList.add("disable");
  //   setTimeout(() => {
  //     document.querySelector(".btn--roll").classList.remove("disable");
  //   }, 700);
};

createNewGame();

/*-----user rolls dice-----*/
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (keepPlaying) {
    //generate random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //display dice roll
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNumber}.png`;

    // is it a diceNumber = 1

    if (diceNumber !== 1) {
      //add dice roll to current score
      dice.classList.remove("hidden-dice-one");
      currentScore += diceNumber;
      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      //switch player

      switchPlayer();
      disableBtn();
      setTimeout(() => {
        dice.classList.add("hidden-dice-one");
      }, 350);
    }
  }
});

/*-----user holds score-----*/
document.querySelector(".btn--hold").addEventListener("click", function () {
  //add current score to total score

  if (keepPlaying) {
    totalScore[player] += currentScore;
    document.getElementById(`score--${player}`).textContent =
      totalScore[player];
    document.getElementById(`current--${player}`).textContent = 0;

    if (totalScore[player] >= 100) {
      //current player wins!

      document
        .querySelector(`.player--${player}`)
        .classList.add("player--winner");
      dice.classList.add("hidden");
      keepPlaying = false;
    } else {
      //switch player
      dice.classList.add("hidden");
      switchPlayer();
      disableBtn();
    }
  }
});

/*-----user rest game-----*/
document.querySelector(".btn--new").addEventListener("click", createNewGame);
