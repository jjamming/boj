const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let line = 0;
const N = Number(input[line++]);
const K = Number(input[line++]);

const matrix = Array.from({ length: N }, () => Array(N).fill(0));

for (let k = 0; k < K; k++) {
  const [i, j] = input[line++].split(" ").map(Number);
  matrix[i-1][j-1] = 2; // 사과 있는 칸: 2
}

const L = Number(input[line++]);
const dChange = [];

for (let i = 0; i < L; i++) {
  const [X, C] = input[line++].split(" ");
  dChange.push([Number(X), C.trim()]);
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

matrix[0][0] = 1; // 뱀 있는 칸: 1
let time = 0;
let [cx, cy, cd] = [0, 0, 1]; // 최초 머리, 방향
const snake = [[0, 0]];

while (true) {
  time++;

  // 먼저 뱀은 몸길이를 늘려 머리를 다음칸에 위치시킨다.
  const [nx, ny] = [cx + dx[cd], cy + dy[cd]];
  if (nx < 0 || ny < 0 || nx >= N || ny >= N) break; // 벽에 부딪힘
  if (matrix[nx][ny] === 1) break; // 자기 몸에 부딪힘

  snake.push([nx, ny]);

  // 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
  if (matrix[nx][ny] === 2) {
    matrix[nx][ny] = 1;
  } else {
    // 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.
    const [tx, ty] = snake.shift();
    matrix[tx][ty] = 0;
    matrix[nx][ny] = 1;
  }

  for (const [t, nd] of dChange) {
    if (t > time) break; // early return
    if (time === t) {
      if (nd === "L") {
        // 반시계 회전
        cd = (cd + 3) % 4;
      } else {
        // nd === "D"
        // 시계 회전
        cd = (cd + 1) % 4;
      }
    }
  }

  [cx, cy] = [nx, ny];
}

console.log(time);
