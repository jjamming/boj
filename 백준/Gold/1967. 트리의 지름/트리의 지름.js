//트리의 지름 #1967
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);

const tree = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < n; i++) {
  const [node1, node2, weight] = input[i].split(" ").map(Number);
  tree[node1].push([node2, weight]);
  tree[node2].push([node1, weight]);
}

let visited = Array(n + 1).fill(false);
let farthestNode = 1;
let maxDist = 0;

function dfs(node, dist) {
  visited[node] = true;

  if (dist > maxDist) {
    maxDist = dist;
    farthestNode = node;
  }

  for (let [adj, weight] of tree[node]) {
    if (visited[adj]) continue;
    dfs(adj, dist + weight);
  }
}

dfs(1, 0);
visited = Array(n + 1).fill(false);
maxDist = 0;
dfs(farthestNode, 0);

console.log(maxDist);
