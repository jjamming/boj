//영역 구하기 #2583
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [M, N, K] = input[0].split(" ").map(Number);

const rectangleArr = [];
for (let i = 1; i <= K; i++) {
  rectangleArr.push(input[i].split(" ").map(Number));
}

const matrix = Array.from({ length: M }, () => Array(N).fill(0));
const visited = Array.from({ length: M }, () => Array(N).fill(false));
const sumArr = [];

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 0; i < K; i++) {
  let [x1, y1, x2, y2] = rectangleArr[i];
  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      matrix[y][x] = 1;
    }
  }
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    if (matrix[i][j] === 1) continue;
    visited[i][j] = true;
    let sum = 0;
    let queue = [[i, j]];
    while (queue.length) {
      let [cx, cy] = queue.shift();
      sum++;
      for (let d = 0; d < 4; d++) {
        let [nx, ny] = [cx + dx[d], cy + dy[d]];
        if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
        if (matrix[nx][ny] === 1) continue;
        if (visited[nx][ny]) continue;
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
    sumArr.push(sum);
  }
}

const sorted = [...sumArr].sort((a, b) => a - b);
let answer = "";
for (let item of sorted) {
  answer += item + " ";
}

console.log(sorted.length);
console.log(answer.trim());
