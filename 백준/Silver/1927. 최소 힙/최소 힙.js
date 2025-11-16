//최소 힙 #1927
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;

      let tmp = this.heap[parentIdx];
      this.heap[parentIdx] = this.heap[idx];
      this.heap[idx] = tmp;

      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;

      if (left >= this.heap.length) break;

      let smaller =
        right < this.heap.length && this.heap[right] < this.heap[left]
          ? right
          : left;

      if (this.heap[idx] > this.heap[smaller]) {
        let tmp = this.heap[idx];
        this.heap[idx] = this.heap[smaller];
        this.heap[smaller] = tmp;
        idx = smaller;
      } else break;
    }
  }
}

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const minHeap = new MinHeap();

let answer = "";
for (let i = 1; i <= N; i++) {
  if (Number(input[i]) === 0) answer += minHeap.pop() + "\n";
  else minHeap.push(Number(input[i]));
}

console.log(answer.trim());
