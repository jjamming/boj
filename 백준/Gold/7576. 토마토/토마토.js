//토마토 #7576
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [m, n] = input[0].split(" ").map(Number);

const matrix = Array.from({ length: n }, () => Array(m).fill(0));
const visited = Array.from({ length: n }, () => Array(m).fill(false));

let count = 0;
let maxTime = 0;

const queue = [];
let head = 0;
let tail = 0;

for (let i = 1; i <= n; i++) {
  const line = input[i].split(" ").map(Number);
  for (let j = 0; j < m; j++) {
    matrix[i - 1][j] = line[j];
    if (matrix[i - 1][j] === 1) {
      queue[tail++] = [i - 1, j, 0];
      visited[i - 1][j] = true;
    } else if (matrix[i - 1][j] === 0) count++;
  }
}

if (count === 0) {
  console.log(0);
  process.exit(0);
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

while (head < tail) {
  const [cx, cy, time] = queue[head++];
  maxTime = Math.max(time, maxTime);

  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [cx + dx[d], cy + dy[d]];
    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
    if (matrix[nx][ny] === -1 || visited[nx][ny]) continue;
    if (matrix[nx][ny] === 0) count--;

    visited[nx][ny] = true;
    queue[tail++] = [nx, ny, time + 1];
  }
}

if (count === 0) console.log(maxTime);
else console.log(-1);
