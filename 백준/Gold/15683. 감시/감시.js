// 감시 #15683
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const office = [];
const cctv = [];

for (let i = 0; i < n; i++) {
  const row = input[i + 1].split(" ").map(Number);
  office.push(row);
  for (let j = 0; j < m; j++) {
    const vertex = row[j];
    if (vertex >= 1 && vertex <= 5) cctv.push([i, j, vertex]);
  }
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const dirSet = {
  1: [[0], [1], [2], [3]],
  2: [
    [0, 2],
    [1, 3],
  ],
  3: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  4: [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 0],
    [3, 0, 1],
  ],
  5: [[0, 1, 2, 3]],
};

let answer = Number.MAX_SAFE_INTEGER;

function watch(x, y, dir, marked) {
  let nx = x + dx[dir];
  let ny = y + dy[dir];

  while (nx >= 0 && ny >= 0 && nx < n && ny < m) {
    if (office[nx][ny] === 6) break;

    if (office[nx][ny] === 0) {
      marked.push([nx, ny]);
      office[nx][ny] = -1;
    }
    nx += dx[dir];
    ny += dy[dir];
  }
}

function dfs(idx) {
  if (idx === cctv.length) {
    let blind = 0;
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        if (office[x][y] === 0) blind++;
      }
    }
    answer = Math.min(blind, answer);
    return;
  }
  let [cx, cy, type] = cctv[idx];

  for (const set of dirSet[type]) {
    const marked = [];
    for (const dir of set) {
      watch(cx, cy, dir, marked);
    }
    dfs(idx + 1);
    for (const [mx, my] of marked) {
      office[mx][my] = 0;
    }
  }
}

dfs(0);
console.log(answer);
