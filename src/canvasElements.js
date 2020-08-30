export const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  dx: 4,
  dy: -4,
  speed: 4,
};
export const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 100,
  h: 10,
  speed: 8,
  dx: 0,
};
export const brick = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};
