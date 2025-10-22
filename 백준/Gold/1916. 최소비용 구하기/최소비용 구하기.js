//최소비용 구하기 #1916

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  _bubbleUp() {
    let index = this.heap.length - 1; // 가장 마지막 노드
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][1] <= this.heap[index][1]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
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

  isEmpty() {
    return this.heap.length === 0;
  }
}

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);
const dist = Array(N + 1).fill(Infinity);

for (let i = 2; i < M + 2; i++) {
  let [u, v, w] = input[i].split(" ").map(Number);
  graph[u].push([v, w]);
}

let pq = new MinHeap();

const [start, end] = input[M + 2].split(" ").map(Number);

pq.push([start, 0]);
dist[start] = 0;

while (!pq.isEmpty()) {
  let [now, distance] = pq.pop();
  if (distance > dist[now]) continue;

  if (now === end) {
    console.log(distance);
    process.exit(0);
  }

  for (const [next, w] of graph[now]) {
    const nd = distance + w;
    if (nd < dist[next]) {
      dist[next] = nd;
      pq.push([next, nd]);
    }
  }
}

console.log(dist[end]);
