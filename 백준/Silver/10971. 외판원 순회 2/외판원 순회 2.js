//외판원 순회2 #10971
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const matrix = [];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

let minDistance = Number.MAX_SAFE_INTEGER;
let visited = Array(N).fill(false);

function traveling(start, city, count, dist) {
  if (dist >= minDistance) return;

  if (count === N) {
    const back = matrix[city][start];
    if (back !== 0) {
      minDistance = Math.min(minDistance, dist + back);
    }
    return;
  }

  for (let next = 0; next < N; next++) {
    if (visited[next]) continue;
    const weight = matrix[city][next];
    if (weight === 0) continue;
    visited[next] = true;
    traveling(start, next, count + 1, dist + weight);
    visited[next] = false;
  }
}

visited[0] = true;
traveling(0, 0, 1, 0);

console.log(minDistance);
