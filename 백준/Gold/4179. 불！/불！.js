// 불! #4179
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let [R, C] = input[0].split(" ").map(Number);

const maze = [];
let answer = -1;

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 1; i <= R; i++) {
  maze.push(input[i].split(""));
}

const jihunQueue = [];
const fireQueue = [];
const visited = Array.from({ length: R }, () => Array(C).fill(false));
const fireTime = Array.from({ length: R }, () =>
  Array(C).fill(Number.MAX_SAFE_INTEGER)
);

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (maze[i][j] === "J") {
      jihunQueue.push([i, j, 0]);
      visited[i][j] = true;
    }
    if (maze[i][j] === "F") {
      fireQueue.push([i, j, 0]);
      fireTime[i][j] = 0;
    }
  }
}

fireBFS();
jihunBFS();

console.log(answer === -1 ? "IMPOSSIBLE" : answer);

function jihunBFS() {
  while (jihunQueue.length) {
    const [x, y, time] = jihunQueue.shift();

    for (dir = 0; dir < 4; dir++) {
      const [nx, ny] = [x + dx[dir], y + dy[dir]];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) {
        answer = time + 1;
        return;
      }

      if (maze[nx][ny] === "#" || maze[nx][ny] === "F" || visited[nx][ny])
        continue;

      if (fireTime[nx][ny] <= time + 1) continue;

      visited[nx][ny] = true;
      jihunQueue.push([nx, ny, time + 1]);
    }
  }
}

function fireBFS() {
  while (fireQueue.length) {
    const [x, y, time] = fireQueue.shift();

    for (dir = 0; dir < 4; dir++) {
      const [nx, ny] = [x + dx[dir], y + dy[dir]];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      if (maze[nx][ny] === "#" || fireTime[nx][ny] <= time + 1) continue; // 벽이거나 이미 불이 있는 경우 제외

      fireTime[nx][ny] = time + 1;
      fireQueue.push([nx, ny, time + 1]);
    }
  }
}
