// 연구소 #14502
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const matrix = [];

for (let i = 1; i <= n; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

let safeCount = 0;
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function wallDFS(wallCount) {
  if (wallCount === 3) {
    let copiedMatrix = matrix.map((row) => [...row]);
    let tmpCount = getSafetyZone(copiedMatrix);

    safeCount = Math.max(tmpCount, safeCount);
    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = 1;
        wallDFS(wallCount + 1);
        matrix[i][j] = 0;
      }
    }
  }
}

function getSafetyZone(matrix) {
  let count = 0;
  const queue = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length > 0) {
    let [px, py] = queue.shift();
    for (let dir = 0; dir < 4; dir++) {
      const [nx, ny] = [px + dx[dir], py + dy[dir]];

      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (matrix[nx][ny] === 0) {
        matrix[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 0) {
        count++;
      }
    }
  }
  return count;
}

wallDFS(0);
console.log(safeCount);
