// 숨바꼭질 #1697
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);

let time = 0;

const move = [(x) => x * 2, (x) => x - 1, (x) => x + 1];

const MAX = 10 * 10000;
const queue = new Array(MAX * 2).fill(false);
const visited = new Array(MAX + 1).fill(false);

let head = 0;
let tail = 0;

queue[tail++] = [n, time];

while (true) {
  let [cLocation, cTime] = queue[head++];
  if (cLocation === k) {
    time = cTime;
    break;
  }

  for (let i = 0; i < 3; i++) {
    let next = move[i](cLocation);
    if (next < 0 || next > 100000 || visited[next]) continue;
    visited[next] = true;
    queue[tail++] = [next, cTime + 1];
  }
}

console.log(time);
