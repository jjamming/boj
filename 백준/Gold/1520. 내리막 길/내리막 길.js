// 내리막 길 #1520
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [M, N] = input[0].split(" ").map(Number);

const map = [];
const dp = Array.from({ length: M }, () => Array(N).fill(-1));

for (let i = 1; i <= M; i++) {
  map.push(input[i].split(" ").map(Number));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function DFS(x, y) {
  if (x === M - 1 && y === N - 1) {
    return 1;
  }

  if (dp[x][y] !== -1) {
    return dp[x][y];
  }

  dp[x][y] = 0;

  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [x + dx[d], y + dy[d]];
    if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;

    if (map[x][y] > map[nx][ny]) {
      dp[x][y] += DFS(nx, ny);
    }
  }

  return dp[x][y];
}

console.log(DFS(0, 0));
