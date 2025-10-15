//주사위 굴리기 #14499
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M, x, y, K] = input[0].split(" ").map(Number);

const matrix = [];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

const command = input[N + 1].split(" ").map(Number);

const move = [0, [0, 1], [0, -1], [-1, 0], [1, 0]];

let dice = [0, 0, 0, 0, 0, 0]; // 위, 북, 동, 서, 남, 아래

function rollDice(dice, direction) {
  let [top, north, east, west, south, bottom] = dice;
  switch (direction) {
    case 1: // E
      return [west, north, top, bottom, south, east];
    case 2: // W
      return [east, north, bottom, top, south, west];
    case 3: // N
      return [south, top, east, west, bottom, north];
    case 4: // S
      return [north, bottom, east, west, top, south];
    default:
      return dice;
  }
}
let answer = "";
let queue = [];
let head = 0;
let tail = 0;
queue[tail++] = [x, y];
for (let c = 0; c < K; c++) {
  let [cx, cy] = queue[head++];
  let dir = command[c];
  let [nx, ny] = [cx + move[dir][0], cy + move[dir][1]];
  if (nx < 0 || ny < 0 || nx >= N || ny >= M) {
    head--;
    continue;
  }
  dice = rollDice(dice, dir);
  if (matrix[nx][ny] === 0) {
    matrix[nx][ny] = dice[5];
  } else {
    dice[5] = matrix[nx][ny];
    matrix[nx][ny] = 0;
  }
  answer += dice[0] + "\n";
  queue[tail++] = [nx, ny];
}

console.log(answer.trim());
