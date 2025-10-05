//안전 영역 #2468
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);

const matrix = [];

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let answer = 0;
let maxHeight = 0;

for (let i = 0; i < n; i++) {
  matrix.push(input[i + 1].split(" ").map(Number));
  for (let j = 0; j < n; j++) {
    maxHeight = Math.max(maxHeight, matrix[i][j]);
  }
}

function getMatrixAfterRain(rain) {
  // true: 안전 , false: 물에 잠김
  const matrixAfterRain = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > rain) {
        matrixAfterRain[i][j] = true;
      }
    }
  }

  return matrixAfterRain;
}

for (let r = 0; r <= maxHeight; r++) {
  const matrixAfterRain = getMatrixAfterRain(r);
  let safe = 0;
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      if (!matrixAfterRain[i][j]) continue;
      dfs(i, j, visited, matrixAfterRain);
      safe++;
    }
  }
  answer = Math.max(safe, answer);
}

console.log(answer);

function dfs(x, y, visited, matrix) {
  visited[x][y] = true;
  for (let dir = 0; dir < 4; dir++) {
    let nx = x + dx[dir];
    let ny = y + dy[dir];
    if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
    if (!matrix[nx][ny]) continue;
    if (visited[nx][ny]) continue;
    dfs(nx, ny, visited, matrix);
  }
}
