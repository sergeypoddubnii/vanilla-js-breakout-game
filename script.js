const showRulesBtn = document.querySelector("#rules-btn");
const closeRulesBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 100,
  height: 10,
};

const drowBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const drowPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const drow = () => {
  drowBall();
  drowPaddle();
};

drow();

const showRules = () => {
  rules.classList.add("show");
};
const closeRules = () => {
  rules.classList.remove("show");
};

showRulesBtn.addEventListener("click", showRules);
closeRulesBtn.addEventListener("click", closeRules);
