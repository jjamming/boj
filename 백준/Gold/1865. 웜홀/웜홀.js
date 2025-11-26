//웜홀 #1865
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const TC = Number(input[0]);
let line = 1;
let answer = "";

for (let t = 0; t < TC; t++) {
  const [N, M, W] = input[line++].split(" ").map(Number);
  const edges = [];

  // 길(무방향)
  for (let i = 0; i < M; i++) {
    const [node1, node2, weight] = input[line++].split(" ").map(Number);
    edges.push([node1, node2, weight]);
    edges.push([node2, node1, weight]);
  }

  // 웜홀(방향)
  for (let i = 0; i < W; i++) {
    const [start, end, weight] = input[line++].split(" ").map(Number);
    edges.push([start, end, -weight]);
  }

  const dist = Array(N + 1).fill(0); // 임시 노드 0에서 각 노드까지 0의 가중치로 갔다고 가정

  // 벨만-포드
  for (let i = 0; i < N - 1; i++) {
    for (let [start, end, weight] of edges) {
      if (dist[end] > dist[start] + weight) {
        dist[end] = dist[start] + weight;
      }
    }
  }

  // N번째 확인 -> 변함이 있다면 음수 사이클 존재
  let isChanged = false;

  for (let [start, end, weight] of edges) {
    if (isChanged) break;

    if (dist[end] > dist[start] + weight) {
      isChanged = true;
    }
  }

  answer += isChanged ? "YES\n" : "NO\n";
}

console.log(answer.trim());
