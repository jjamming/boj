// 최소비용 구하기 2 #11779
class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    if (this.heap.length === 0) return null;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][1] <= this.heap[index][1]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left][1] < this.heap[smallest][1])
        smallest = left;
      if (right < length && this.heap[right][1] < this.heap[smallest][1])
        smallest = right;

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);
const dist = Array(N + 1).fill(Infinity);
const parent = Array(N + 1).fill(0);
const pq = new MinHeap();

for (let i = 0; i < M; i++) {
  const [start, end, dist] = input[i + 2].split(" ").map(Number);
  graph[start].push([end, dist]);
}

const [start, end] = input[M + 2].split(" ").map(Number);
dist[start] = 0;
pq.push([start, 0]);

while (!pq.isEmpty()) {
  const [node, value] = pq.pop();

  if (dist[node] < value) continue;

  for (const adj of graph[node]) {
    const [next, nextValue] = adj;
    const newDist = dist[node] + nextValue;

    if (newDist < dist[next]) {
      dist[next] = newDist;
      parent[next] = node;
      pq.push([next, newDist]);
    }
  }
}

console.log(dist[end]);

const path = [];
let cur = end;
while (cur !== 0) {
  path.push(cur);
  cur = parent[cur];
}
path.reverse();

console.log(path.length);
console.log(path.join(" "));
