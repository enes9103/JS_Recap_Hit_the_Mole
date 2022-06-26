//SELECTORS
const moles = document.querySelectorAll(".mole");
const startButton = document.getElementById("start");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");
//İNİTİAL VALUES
let firstMole;
let timesOver = false;
let score = 0;
let time = 20;

moles.forEach((mole) => mole.addEventListener("click", hit));
// console.log(moles);

//FUNCTIONS
startButton.addEventListener("click", () => {
  time = 20;
  score = 0;
  timesOver = false;
  const interval = setInterval(() => {
    startTimer();
    if (timesOver) clearInterval(interval);
  }, 1000);
  seen();
  setTimeout(() => {
    timesOver = true;
  }, time * 1000);
});

function startTimer() {
  if (!timesOver) {
    time--;
    timeText.textContent = time;
  } else {
    timeText.textContent = "Time is Over!!!";
  }
}

function seen() {
  const mole = randomMole();
  const moleTimes = randomTime(750, 1250);
  mole.classList.add("choisen");
  setTimeout(() => {
    mole.classList.remove("choisen");
    if (!timesOver) seen();
  }, moleTimes);
}

function randomMole() {
  const turn = Math.floor(Math.random() * moles.length);
  const choisen = moles[turn];
  if (firstMole === choisen) {
    return randomMole();
  } else {
    firstMole = choisen;
  }
  return choisen;
}

function randomTime(min, max) {
  const time = Math.round(Math.random() * (max - min)) + min;
  return time;
}

function hit(e) {
  if (e.target.classList.contains("choisen")) {
    score++;
    e.target.classList.remove("choisen");
  }
  scoreText.textContent = score;
}

