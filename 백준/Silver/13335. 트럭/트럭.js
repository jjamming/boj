//트럭 #13335
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, W, L] = input[0].split(" ").map(Number);

let trucks = input[1].split(" ").map(Number);

let bridge = new Array(W).fill(0);
let head = 0;
let tail = N - 1;
let sum = 0;
let time = 0;

while (head <= tail || sum > 0) {
  let truck = trucks[head];
  let finished = bridge.shift();
  bridge.push(0);
  sum -= finished;
  if (bridge[W - 1] === 0 && sum + truck <= L) {
    bridge[W - 1] = truck;
    sum += truck;
    head++;
  }
  time++;
}

console.log(time);
