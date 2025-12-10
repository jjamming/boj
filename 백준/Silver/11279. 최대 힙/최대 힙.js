//최대 힙 #11279
class MaxHeap {
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

    let max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return max;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[parentIdx] >= this.heap[idx]) break;

      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];

      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;

      if (left >= this.heap.length) break;

      let bigger =
        right < this.heap.length && this.heap[right] > this.heap[left]
          ? right
          : left;

      if (this.heap[idx] < this.heap[bigger]) {
        [this.heap[idx], this.heap[bigger]] = [
          this.heap[bigger],
          this.heap[idx],
        ];
        idx = bigger;
      } else break;
    }
  }
}

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const maxHeap = new MaxHeap();

let answer = "";

for (let i = 1; i <= N; i++) {
  const calc = Number(input[i]);

  if (calc === 0) {
    answer += maxHeap.pop() + "\n";
  } else {
    maxHeap.push(calc);
  }
}

console.log(answer.trim());
