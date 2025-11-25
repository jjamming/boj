//빗물 #14719
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [H, W] = input[0].split(" ").map(Number);

const blocks = input[1].split(" ").map(Number);

let answer = 0;

const maxLeft = Array(W).fill(0);
maxLeft[0] = blocks[0];
for (let i = 1; i < W; i++) {
  maxLeft[i] = Math.max(maxLeft[i - 1], blocks[i]);
}

const maxRight = Array(W).fill(0);
maxRight[W - 1] = blocks[W - 1];
for (let i = W - 2; i >= 0; i--) {
  maxRight[i] = Math.max(maxRight[i + 1], blocks[i]);
}

for (let i = 0; i < W; i++) {
  const height = Math.min(maxLeft[i], maxRight[i]) - blocks[i];
  if (height > 0) answer += height;
}

console.log(answer);
