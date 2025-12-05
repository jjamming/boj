//서강 그라운드 #14938
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m, r] = input[0].split(" ").map(Number);
const items = [0, ...input[1].split(" ").map(Number)];
const nodes = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

nodes.forEach((_, i) => {
  nodes[i][i] = 0;
});

for (let i = 0; i < r; i++) {
  const [node1, node2, weight] = input[i + 2].split(" ").map(Number);
  nodes[node1][node2] = weight;
  nodes[node2][node1] = weight;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (nodes[i][j] > nodes[i][k] + nodes[k][j]) {
        nodes[i][j] = nodes[i][k] + nodes[k][j];
      }
    }
  }
}

const cand = Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  let sum = items[i];
  for (let j = 1; j <= n; j++) {
    if (i === j) continue;
    if (nodes[i][j] <= m) {
      sum += items[j];
    }
  }
  cand[i] = sum;
}

console.log(Math.max(...cand));
