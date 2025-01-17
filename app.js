let gameSeq = [];
let userSeq = [];
let score = 0;

let highScore = 0; 
let highScoreDisplay = document.createElement("h3"); // Display high score
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.body.appendChild(highScoreDisplay);

let btns = ["red", "green", "yellow", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random()*3)+1;
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  // console.log("curr level :", level);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `game over! your score was <b>${level}</b> <br> press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}
function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  // Update high score if the current level is higher
  if (level > highScore) {
    highScore = level;
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }

  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
