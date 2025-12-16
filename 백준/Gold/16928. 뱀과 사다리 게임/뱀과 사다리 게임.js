//뱀과 사다리 게임 #16928
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const jump = Array(101).fill(0);
const dist = Array(101).fill(-1);

for (let i = 1; i <= N + M; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  jump[from] = to;
}

const queue = [];
queue.push(1);

dist[1] = 0;
let head = 0;

while (head < queue.length) {
  const cx = queue[head++];

  for (let d = 1; d <= 6; d++) {
    let nx = cx + d;

    if (nx > 100) continue;

    if (jump[nx] !== 0) nx = jump[nx];

    if (dist[nx] !== -1) continue;

    dist[nx] = dist[cx] + 1;
    queue.push(nx);
  }
}

console.log(dist[100]);
