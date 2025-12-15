//이중 우선순위 큐 #7662
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push({ value, id }) {
    this.heap.push({ value, id });
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return max;
  }

  top() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent].value < this.heap[idx].value) {
        [this.heap[parent], this.heap[idx]] = [
          this.heap[idx],
          this.heap[parent],
        ];
        idx = parent;
      } else break;
    }
  }

  bubbleDown() {
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;

      if (left >= this.heap.length) break;

      let bigger =
        right < this.heap.length &&
        this.heap[right].value > this.heap[left].value
          ? right
          : left;

      if (this.heap[idx].value < this.heap[bigger].value) {
        [this.heap[idx], this.heap[bigger]] = [
          this.heap[bigger],
          this.heap[idx],
        ];
        idx = bigger;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push({ value, id }) {
    this.heap.push({ value, id });
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return min;
  }

  top() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent].value > this.heap[idx].value) {
        [this.heap[parent], this.heap[idx]] = [
          this.heap[idx],
          this.heap[parent],
        ];
        idx = parent;
      } else break;
    }
  }

  bubbleDown() {
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;

      if (left >= this.heap.length) break;

      let smaller =
        right < this.heap.length &&
        this.heap[right].value < this.heap[left].value
          ? right
          : left;

      if (this.heap[idx].value > this.heap[smaller].value) {
        [this.heap[idx], this.heap[smaller]] = [
          this.heap[smaller],
          this.heap[idx],
        ];
        idx = smaller;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

let TC = null;
let currentTC = 0;
let calc = 0;
let opCount = 0;

let maxHeap = null;
let minHeap = null;
let visited = null;
let currentId = 0;
let answer = "";

rl.on("line", (line) => {
  if (TC === null) {
    TC = Number(line);
    return;
  }

  if (calc === 0) {
    calc = Number(line);
    maxHeap = new MaxHeap();
    minHeap = new MinHeap();
    visited = [];
    currentId = 0;
    opCount = 0;
    return;
  }

  let [type, value] = line.split(" ");
  value = Number(value);

  if (type === "D") {
    if (value > 0) {
      while (true) {
        let record = maxHeap.pop();
        if (!record) break;

        if (visited[record.id]) {
          visited[record.id] = false;
          break;
        }
      }
    } else {
      while (true) {
        let record = minHeap.pop();
        if (!record) break;

        if (visited[record.id]) {
          visited[record.id] = false;
          break;
        }
      }
    }
  } else {
    maxHeap.push({ value, id: currentId });
    minHeap.push({ value, id: currentId });
    visited.push(true);
    currentId++;
  }

  opCount++;

  if (opCount === calc) {
    while (!maxHeap.isEmpty() && !visited[maxHeap.top().id]) {
      maxHeap.pop();
    }

    while (!minHeap.isEmpty() && !visited[minHeap.top().id]) {
      minHeap.pop();
    }

    if (maxHeap.isEmpty() || minHeap.isEmpty()) {
      answer += "EMPTY" + "\n";
    } else {
      answer += `${maxHeap.top().value} ${minHeap.top().value}\n`;
    }

    currentTC++;
    calc = 0;

    if (currentTC === TC) {
      console.log(answer.trim());
      rl.close();
    }
  }
});
