"use strict";

let score = 20;
let random = Math.trunc(Math.random() * 20) + 1;
const number = document.querySelector(".number");
const message = document.querySelector(".message");
number.value = random;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (guess === 0) {
    message.textContent = "⛔No namber";
  }

  if (guess === random) {
    message.textContent = "🎉Correct Number!";
    document.querySelector(".highscore").textContent = score;
    document.body.style.backgroundColor = "rgb(96, 179, 71)";
    number.style.width = "30rem";
    number.textContent = random;
  } else if (guess !== random && guess !== 0) {
    message.textContent = guess > random ? "📈Too high!" : "📉Too low!";
    score--;
    document.querySelector(".score").textContent = score;
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  random = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".guess").value = " ";
  document.body.style.backgroundColor = "#222";
  document.querySelector(".score").textContent = "20";
  number.textContent = "?";
  number.style.width = "15rem";
  message.textContent = "Start guessing...";
});
