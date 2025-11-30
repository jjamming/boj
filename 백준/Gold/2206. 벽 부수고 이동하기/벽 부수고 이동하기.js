// 벽 부수고 이동하기 #2206
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const matrix = [[]];
let flag = false;

for (let i = 1; i <= n; i++) {
  matrix.push([0, ...input[i].split("").map(Number)]);
}

const visitedWithoutBreak = Array.from({ length: n + 1 }, () =>
  Array(m + 1).fill(false)
);
const visitedWithBreak = Array.from({ length: n + 1 }, () =>
  Array(m + 1).fill(false)
);

const queue = [];
let head = 0;
let tail = 0;

queue[tail++] = [1, 1, 1, false];
visitedWithoutBreak[1][1] = true;

while (head < tail) {
  const [cx, cy, time, isBroke] = queue[head++];
  if (cx === n && cy === m) {
    console.log(time);
    flag = true;
    break;
  }

  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [cx + dx[d], cy + dy[d]];
    if (nx <= 0 || ny <= 0 || nx > n || ny > m) continue;

    if (matrix[nx][ny] === 1) {
      if (!isBroke && !visitedWithBreak[nx][ny]) {
        visitedWithBreak[nx][ny] = true;
        queue[tail++] = [nx, ny, time + 1, true];
      }
    } else {
      if (!isBroke && !visitedWithoutBreak[nx][ny]) {
        visitedWithoutBreak[nx][ny] = true;
        queue[tail++] = [nx, ny, time + 1, false];
      }

      if (isBroke && !visitedWithBreak[nx][ny]) {
        visitedWithBreak[nx][ny] = true;
        queue[tail++] = [nx, ny, time + 1, true];
      }
    }
  }
}

if (!flag) {
  console.log(-1);
}
