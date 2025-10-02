// 미로 탐색 #2178
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const maze = [[]];
const visited = Array.from({ length: n + 1 }, () =>
  new Array(m + 1).fill(false)
);
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let answer = Number.MAX_SAFE_INTEGER;

for (let i = 1; i <= n; i++) {
  maze.push([-1, ...input[i].split("").map(Number)]);
}

const queue = [];
let head = 0;
let tail = 0;

queue[tail++] = [1, 1, 0];

while (head !== tail) {
  let [cx, cy, count] = queue[head++];

  if (cx === n && cy === m) {
    answer = Math.min(count + 1, answer);
  }

  for (let dir = 0; dir < 4; dir++) {
    let [nx, ny] = [cx + dx[dir], cy + dy[dir]];
    let nextCount = count + 1;

    if (nx < 1 || ny < 1 || nx > n || ny > m) continue;

    if (maze[nx][ny] === 1 && !visited[nx][ny]) {
      visited[nx][ny] = true;
      queue[tail++] = [nx, ny, nextCount];
    }
  }
}

console.log(answer);
