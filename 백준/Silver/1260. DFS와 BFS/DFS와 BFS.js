//dfs와 bfs #1260
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M, V] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  let [node1, node2] = input[i].split(" ").map(Number);
  graph[node1].push(node2);
  graph[node2].push(node1);
}

for (let i = 1; i <= N; i++) {
  graph.map((node) => node.sort((a, b) => a - b));
}

const dfsResult = [];
const bfsResult = [];

function dfs(n, visited) {
  dfsResult.push(n);
  visited[n] = true;
  for (let adj of graph[n]) {
    if (visited[adj]) continue;
    dfs(adj, visited);
  }
}

function bfs(n) {
  let queue = [n];
  let head = 0;
  let tail = 1;

  let visited = Array(N + 1).fill(false);
  visited[n] = true;

  while (head < tail) {
    let node = queue[head++];
    bfsResult.push(node);
    for (let adj of graph[node]) {
      if (visited[adj]) continue;
      visited[adj] = true;
      queue[tail++] = adj;
    }
  }
}

dfs(V, Array(N + 1).fill(false));
bfs(V);

let answer = "";

for (let i of dfsResult) {
  answer += i + " ";
}

answer += "\n";

for (let i of bfsResult) {
  answer += i + " ";
}

console.log(answer.trim());
