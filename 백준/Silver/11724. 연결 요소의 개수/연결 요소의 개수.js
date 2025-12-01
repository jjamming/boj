//연결 요소의 개수 #11724
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const edges = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(false);

let graph = 0;

for (let i = 1; i <= M; i++) {
  const [node1, node2] = input[i].split(" ").map(Number);
  edges[node1].push(node2);
  edges[node2].push(node1);
}

for (let i = 1; i <= N; i++) {
  if (visited[i]) continue;

  dfs(i);
  graph++;
}

function dfs(node) {
  for (let adj of edges[node]) {
    if (visited[adj]) continue;

    visited[adj] = true;
    dfs(adj);
  }
}

console.log(graph);
