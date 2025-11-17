//최단경로 #1753
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;

      let tmp = this.heap[parent];
      this.heap[parent] = this.heap[idx];
      this.heap[idx] = tmp;

      idx = parent;
    }
  }

  bubbleDown() {
    let idx = 0;

    while (true) {
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (left >= this.heap.length) break;

      let minIdx =
        right < this.heap.length && this.heap[right] < this.heap[left]
          ? right
          : left;

      if (this.heap[idx] > this.heap[minIdx]) {
        let tmp = this.heap[idx];
        this.heap[idx] = this.heap[minIdx];
        this.heap[minIdx] = tmp;
        idx = minIdx;
      } else break;
    }
  }
}

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);

const start = Number(input[1]);

const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const [from, to, weight] = input[i + 2].split(" ").map(Number);
  graph[from].push([to, weight]);
}

const INF = Infinity;
const dist = Array(V + 1).fill(INF);

function dijkstra(start) {
  const pq = new MinHeap();
  dist[start] = 0;
  pq.push([0, start]);

  while (!pq.isEmpty()) {
    const [currentDist, node] = pq.pop();

    if (currentDist > dist[node]) continue;

    for (const [next, weight] of graph[node]) {
      const nextDist = currentDist + weight;
      if (nextDist < dist[next]) {
        dist[next] = nextDist;
        pq.push([nextDist, next]);
      }
    }
  }
}

dijkstra(start);

let answer = "";

for (let i = 1; i <= V; i++) {
  if (dist[i] === Infinity) answer += "INF\n";
  else answer += dist[i] + "\n";
}

console.log(answer.trim());
