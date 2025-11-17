//파티 #1238
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M, X] = input[0].split(" ").map(Number);

const village = Array.from({ length: N + 1 }, () =>
  Array(N + 1).fill(Infinity)
);

for (let i = 1; i <= M; i++) {
  const [from, to, value] = input[i].split(" ").map(Number);
  village[from][to] = value;
}

for (let i = 1; i <= N; i++) {
  village[i][i] = 0;
}

const timeToMove = Array(N + 1).fill(0);

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (village[i][k] === Infinity || village[k][j] === Infinity) continue;
      village[i][j] = Math.min(village[i][j], village[i][k] + village[k][j]);
    }
  }
}

for (let i = 1; i <= N; i++) {
  timeToMove[i] = village[i][X] + village[X][i];
}

console.log(Math.max(...timeToMove));
