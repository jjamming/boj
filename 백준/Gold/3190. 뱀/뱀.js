// 뱀 #3190, 삼성 기출문제집
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);
let k = Number(input[1]);
let l = Number(input[2 + k]);

let matrix = [];
let turn = [];

for (let i = 0; i <= n; i++) {
  matrix[i] = [];
  for (let j = 0; j <= n; j++) {
    matrix[i][j] = 0;
  }
}

for (let i = 2; i < 2 + k; i++) {
  let [x, y] = input[i].split(" ").map(Number);
  matrix[x][y] = 1;
}

for (let i = 3 + k; i < 3 + k + l; i++) {
  let [x, c] = input[i].split(" ");
  turn[x] = c;
}

let time = 0;
let dir = 0; // 0:E, 1:S, 2:W, 3:N
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const snake = [[1, 1]];
let headIdx = 0;
let sx = 1;
let sy = 1;
matrix[1][1] = 2;

while (true) {
  time++;

  const nx = sx + dx[dir];
  const ny = sy + dy[dir];

  if (nx < 1 || ny < 1 || nx > n || ny > n || matrix[nx][ny] === 2) {
    // 머리가 간 곳이 벽 || 뱀의 몸이라면
    console.log(time);
    break;
  }

  if (matrix[nx][ny] !== 1) {
    // 사과가 아니라면 꼬리 한칸 줄이기
    const [tx, ty] = snake[headIdx++];
    matrix[tx][ty] = 0;
  }

  // 뱀 머리 이동
  snake.push([nx, ny]);
  matrix[nx][ny] = 2;
  sx = nx;
  sy = ny;

  if (turn[time] === "D") {
    // 시계방향으로 변경
    dir = (dir + 1) % 4;
  } else if (turn[time] === "L") {
    // 반시계방향으로 변경
    dir = (dir + 3) % 4;
  }
}
