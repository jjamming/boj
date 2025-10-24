//연구소 2 #17141
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const canVirus = [];
const matrix = [];
const selected = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let emptyCount = 0;
let minTime = Number.MAX_SAFE_INTEGER;

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
  for (let j = 0; j < N; j++) {
    if (matrix[i - 1][j] === 2) canVirus.push([i - 1, j]);
    if (matrix[i - 1][j] === 0) emptyCount++;
  }
}

dfs(0, 0);
// idea: canVirus에서 3개를 선택함(dfs)
// 3개 선택되면 바이러스 퍼뜨림(bfs)
// bfs 끝났을 때 0인 칸의 개수가 0이라면 time 비교, 다 못퍼뜨렸으면 -1
// 시간 최적화 -> 0인 칸 개수 세지 말고 count로 세기

function dfs(depth, start) {
  if (depth === M) {
    spreadVirus(selected);
    return;
  }
  for (let i = start; i < canVirus.length; i++) {
    selected.push(canVirus[i]);
    dfs(depth + 1, i + 1);
    selected.pop();
  }
}

function spreadVirus(selected) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  let queue = [];
  let head = 0;
  let tail = 0;

  for (let [sx, sy] of selected) {
    queue[tail++] = [sx, sy, 0];
    visited[sx][sy] = true;
  }

  let time = 0;

  while (head < tail) {
    let [cx, cy, ctime] = queue[head++];
    time = Math.max(time, ctime);

    for (let d = 0; d < 4; d++) {
      let [nx, ny] = [cx + dx[d], cy + dy[d]];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (matrix[nx][ny] === 1) continue;
      if (visited[nx][ny]) continue;

      visited[nx][ny] = true;
      queue[tail++] = [nx, ny, ctime + 1];
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] !== 1 && !visited[i][j]) {
        return;
      }
    }
  }

  minTime = Math.min(minTime, time);
}

console.log(minTime === Number.MAX_SAFE_INTEGER ? -1 : minTime);
