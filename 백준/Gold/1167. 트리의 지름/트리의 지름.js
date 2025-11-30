// 트리의 지름 #1167
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);

const edges = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= n; i++) {
  const line = input[i].split(" ").map(Number);
  let l = 0;
  const start = line[l++];
  while (true) {
    if (line[l] === -1) break;
    let end = line[l++];
    let weight = line[l++];
    edges[start].push([end, weight]);
  }
}

let visited = Array(n + 1).fill(false);
let dist = Array(n + 1).fill(0);

function dfs(node, tmpDist) {
  visited[node] = true;

  for (let [next, weight] of edges[node]) {
    if (visited[next]) continue;
    dist[next] = tmpDist + weight;
    dfs(next, tmpDist + weight);
  }
}

dfs(1, 0);

let max = 0;
let farthest = 0;
for (let i = 1; i <= n; i++) {
  if (dist[i] > max) {
    max = dist[i];
    farthest = i;
  }
}

visited = Array(n + 1).fill(false);
dist = Array(n + 1).fill(0);

dfs(farthest, 0);

console.log(Math.max(...dist));
