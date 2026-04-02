const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const matrix = [];
const visited = Array.from({ length: N }, () => Array(M).fill(false));

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let count = 0;
let maxArea = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j] && matrix[i][j] === 1) {
      visited[i][j] = true;
      count++;
      const area = bfs(i, j);
      maxArea = Math.max(maxArea, area);
    }
  }
}

console.log(count);
console.log(maxArea);

function bfs(x, y) {
  visited[x][y] = true;
  const queue = [];
  let head = 0;
  let tail = 0;

  queue[tail++] = [x, y];
  let area = 1;

  while (head < tail) {
    const [cx, cy] = queue[head++];

    for (let d = 0; d < 4; d++) {
      const [nx, ny] = [cx + dx[d], cy + dy[d]];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny] || matrix[nx][ny] === 0) continue;

      visited[nx][ny] = true;
      area++;
      queue[tail++] = [nx, ny];
    }
  }

  return area;
}
