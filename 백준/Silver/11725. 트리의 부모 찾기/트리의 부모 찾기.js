// 트리의 부모 찾기 #11725
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);

const parent = new Array(n + 1).fill(-1);

const nodes = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < n; i++) {
  let [node1, node2] = input[i].split(" ").map(Number);

  nodes[node1].push(node2);
  nodes[node2].push(node1);
}

function dfs(node) {
  for (let i = 0; i < nodes[node].length; i++) {
    let nextNode = nodes[node][i];
    if (parent[nextNode] !== -1) continue;
    parent[nextNode] = node;
    dfs(nextNode);
  }
}

dfs(1);

const result = [];
for (let i = 2; i < parent.length; i++) {
  result.push(parent[i]);
}

console.log(result.join("\n"));
