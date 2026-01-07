//아기 상어 #16236
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const matrix = [];
let sharkPos = null;
let sharkSize = 2;
let eatenFish = 0;

for (let i = 1; i <= N; i++) {
  const line = input[i].split(" ").map(Number);
  matrix.push(line);
  for (let j = 0; j < N; j++) {
    const cur = line[j];
    if (cur === 9) {
      sharkPos = [i - 1, j];
      matrix[i - 1][j] = 0;
    }
  }
}

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

function bfs() {
  const [sx, sy] = sharkPos;

  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  const queue = [[sx, sy, 0]];
  visited[sx][sy] = true;

  let cand = [];
  let minDist = Infinity;

  let head = 0;
  let tail = 1;

  while (head < tail) {
    const [x, y, dist] = queue[head++];

    if (dist > minDist) continue;

    if (matrix[x][y] !== 0 && matrix[x][y] < sharkSize) {
      minDist = dist;
      cand.push({ x, y, dist });
      continue;
    }

    for (let d = 0; d < 4; d++) {
      const [nx, ny] = [x + dx[d], y + dy[d]];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (visited[nx][ny]) continue;
      if (matrix[nx][ny] > sharkSize) continue;

      visited[nx][ny] = true;
      queue[tail++] = [nx, ny, dist + 1];
    }
  }

  if (cand.length === 0) return null;

  cand.sort((a, b) => {
    if (a.dist !== b.dist) return a.dist - b.dist;
    if (a.x !== b.x) return a.x - b.x;
    return a.y - b.y;
  });

  return cand[0];
}

let totalTime = 0;

while (true) {
  const fish = bfs();

  if (!fish) break;

  sharkPos = [fish.x, fish.y];
  totalTime += fish.dist;
  matrix[fish.x][fish.y] = 0;
  eatenFish++;

  if (eatenFish === sharkSize) {
    sharkSize++;
    eatenFish = 0;
  }
}

console.log(totalTime);
