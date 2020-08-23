const showRulesBtn = document.querySelector("#rules-btn");
const closeRulesBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let score = 0;

//ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  dx: 4,
  dy: -4,
  speed: 4,
};

//paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 100,
  h: 10,
  speed: 8,
  dx: 0,
};

//brick
const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//array of bricks
const brickRowCount = 9;
const brickColumnCount = 5;
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brick.w + brick.padding) + brick.offsetX;
    const y = j * (brick.h + brick.padding) + brick.offsetY;
    bricks[i][j] = { x, y, ...brick };
  }
}

const drowBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const drowPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const drowBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
};

//move paddle on canvas
const movePaddle = () => {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
};

const increaseScore = () => {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
};

const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.size + ball.y > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
};

//drow
const drow = () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drowBall();
  drowPaddle();
  drowBricks();
};

//Update Canvas Drowing
const update = () => {
  movePaddle();
  moveBall();
  //drow all
  drow();
  requestAnimationFrame(update);
};

update();
//rules
const showRules = () => {
  rules.classList.add("show");
};
const closeRules = () => {
  rules.classList.remove("show");
};

const keyDown = (e) => {
  console.log(e);
  if (e.key === "ArrowRight" || e.key === "Right") {
    console.log("it works");
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (
    e.key === "ArrowRight" ||
    e.key === "Right" ||
    e.key === "ArrowLeft" ||
    e.key === "Left"
  ) {
    paddle.dx = 0;
  }
};

//paddle events
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
//rules events
showRulesBtn.addEventListener("click", showRules);
closeRulesBtn.addEventListener("click", closeRules);
