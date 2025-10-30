//케빈 베이컨의 6단계 법칙 #1389

// 모든 노드를 기준으로 bfs 돌려서 각 노드로의 거리(최소) 재기
// 노드 당 케빈베이컨 거리 찾기

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
let min = Number.MAX_SAFE_INTEGER;
let answer = -1;

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  let [node1, node2] = input[i].split(" ").map(Number);
  graph[node1].push(node2);
  graph[node2].push(node1);
  graph[node1] = [...new Set(graph[node1])];
  graph[node2] = [...new Set(graph[node2])];
}

for (let i = 1; i <= N; i++) {
  let visited = Array(N + 1).fill(false);
  let distance = 0;
  let queue = [];
  for (let next of graph[i]) {
    queue.push([next, 1]);
    visited[next] = true;
  }
  while (queue.length) {
    let [current, dist] = queue.shift();
    distance += dist;
    for (let nextItem of graph[current]) {
      if (visited[nextItem]) continue;
      if (nextItem === i) continue;
      queue.push([nextItem, dist + 1]);
      visited[nextItem] = true;
    }
  }
  if (distance < min) {
    min = distance;
    answer = i;
  }
}

console.log(answer);
