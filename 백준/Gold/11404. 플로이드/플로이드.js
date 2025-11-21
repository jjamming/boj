//플로이드 #11404
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

for (let i = 0; i < M; i++) {
  const [from, to, weight] = input[i + 2].split(" ").map(Number);
  dist[from][to] = Math.min(weight, dist[from][to]);
}

dist.forEach((line, idx) => (line[idx] = 0));

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i === j) continue;
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

let answer = "";

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (dist[i][j] === Infinity) answer += 0 + " ";
    else answer += dist[i][j] + " ";
  }
  answer += "\n";
}

console.log(answer.trim());
