// 쉬운 최단거리 #14940
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const map = Array.from({ length: n }, () => Array(m).fill(0));
const visited = Array.from({ length: n }, () => Array(m).fill(false));
const answer = Array.from({ length: n }, () => Array(m).fill(-1));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const queue = [];
let head = 0;
let tail = 0;

for (let i = 1; i <= n; i++) {
  let line = input[i].split(" ").map(Number);
  for (let j = 0; j < m; j++) {
    if (line[j] === 2) {
      queue[tail++] = [i - 1, j, 0];
      visited[i - 1][j] = true;
    } else if (line[j] === 0) {
      answer[i - 1][j] = 0;
    }
    map[i - 1][j] = line[j];
  }
}

while (head < tail) {
  const [cx, cy, dist] = queue[head++];
  answer[cx][cy] = dist;

  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [cx + dx[d], cy + dy[d]];
    if (nx < 0 || ny < 0 || nx >= n || ny >= m || map[nx][ny] === 0) continue;
    if (visited[nx][ny]) continue;

    visited[nx][ny] = true;
    queue[tail++] = [nx, ny, dist + 1];
  }
}

let output = "";

for (let line of answer) {
  output += line.join(" ") + "\n";
}

console.log(output.trim());
