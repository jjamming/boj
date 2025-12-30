//알파벳 #1987
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [R, C] = input[0].split(" ").map(Number);

const matrix = [];

for (let i = 1; i <= R; i++) {
  matrix.push(input[i].split(""));
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const visited = Array.from({ length: R }, () => Array(C).fill(false));

const set = new Set();

set.add(matrix[0][0]);
visited[0][0] = true;
let count = 1;

dfs(0, 0, count);

console.log(count);

function dfs(x, y, cnt) {
  count = Math.max(cnt, count);
  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [x + dx[d], y + dy[d]];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (visited[nx][ny]) continue;

    let nextAlphabet = matrix[nx][ny];
    if (set.has(nextAlphabet)) continue;

    set.add(nextAlphabet);
    visited[nx][ny] = true;

    dfs(nx, ny, cnt + 1);

    set.delete(nextAlphabet);
    visited[nx][ny] = false;
  }
}
