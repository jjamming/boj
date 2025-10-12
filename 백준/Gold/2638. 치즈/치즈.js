//치즈 #2638
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const matrix = [];

for (let i = 1; i <= n; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let time = 0;

while (true) {
  const out = Array.from({ length: n }, () => Array(m).fill(false));
  const queue = [[0, 0]];
  out[0][0] = true;

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let dir = 0; dir < 4; dir++) {
      let [nx, ny] = [x + dx[dir], y + dy[dir]];
      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (out[nx][ny]) continue;
      if (matrix[nx][ny] === 0) {
        out[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  const melt = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 1) {
        let count = 0;
        for (let dir = 0; dir < 4; dir++) {
          let [nx, ny] = [i + dx[dir], j + dy[dir]];
          if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
          if (out[nx][ny]) count++;
        }
        if (count >= 2) melt.push([i, j]);
      }
    }
  }

  if (melt.length === 0) break;

  melt.forEach(([x, y]) => (matrix[x][y] = 0));
  time++;
}

console.log(time);
