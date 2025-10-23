//헌내기는 친구가 필요해 #21736
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const campus = [];
const queue = [];
const visited = Array.from({ length: N }, () => Array(M).fill(false));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 1; i <= N; i++) {
  campus.push(input[i].split(""));
  for (let j = 0; j < M; j++) {
    if (campus[i - 1][j] === "I") {
      queue.push([i - 1, j]);
    }
  }
}

let friends = 0;
let head = 0;
let tail = 1;

while (head < tail) {
  let [cx, cy] = queue[head++];
  if (campus[cx][cy] === "P") {
    friends++;
  }

  for (let d = 0; d < 4; d++) {
    let [nx, ny] = [cx + dx[d], cy + dy[d]];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (visited[nx][ny] || campus[nx][ny] === "X") continue;
    visited[nx][ny] = true;
    queue[tail++] = [nx, ny];
  }
}

console.log(friends === 0 ? "TT" : friends);
