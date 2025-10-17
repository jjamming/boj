//로봇 청소기 #14503
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let [sx, sy, sd] = input[1].split(" ").map(Number);

const matrix = [];

for (let i = 2; i <= N + 1; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

const direction = [
  [-1, 0], // N
  [0, 1], // E
  [1, 0], // S
  [0, -1], // W
];

let cleaned = 0;
let isRunning = true;

while (isRunning) {
  // 청소
  if (matrix[sx][sy] === 0) {
    matrix[sx][sy] = 2;
    cleaned++;
  }

  let hasDirty = false;
  for (let dir = 0; dir < 4; dir++) {
    let [nx, ny] = [sx + direction[dir][0], sy + direction[dir][1]];
    if (matrix[nx][ny] === 0) {
      // 4칸 중 청소되지 않은 칸이 있다면 break;
      hasDirty = true;
      break;
    }
  }

  if (hasDirty) {
    // 반시계 회전
    sd = (sd - 1 + 4) % 4;

    let [fx, fy] = [sx + direction[sd][0], sy + direction[sd][1]];
    if (matrix[fx][fy] === 0) {
      [sx, sy] = [fx, fy];
    }
  } else {
    let [bx, by] = [sx - direction[sd][0], sy - direction[sd][1]];
    if (matrix[bx][by] !== 1) {
      [sx, sy] = [bx, by];
    } else {
      isRunning = false;
    }
  }
}

console.log(cleaned);
