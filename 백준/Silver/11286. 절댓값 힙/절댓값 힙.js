//절댓값 힙 #11286
class AbsHeap {
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

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  compare(a, b) {
    if (Math.abs(a) !== Math.abs(b)) {
      return Math.abs(a) - Math.abs(b);
    }
    return a - b;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.compare(this.heap[parentIdx], this.heap[idx]) <= 0) break;

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
      let smallest = idx;

      if (
        left < this.heap.length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];

      idx = smallest;
    }
  }
}

const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

let answer = "";

const heap = new AbsHeap();

for (let i = 1; i <= N; i++) {
  let calc = Number(input[i]);

  if (calc === 0) {
    answer += heap.pop() + "\n";
  } else {
    heap.push(calc);
  }
}

console.log(answer.trim());
