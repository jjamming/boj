//꿀 따기 #21758
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const sum = Array(N + 1).fill(0);

arr.unshift(0);

for (let i = 1; i <= N; i++) {
  sum[i] = sum[i - 1] + arr[i];
}

let maxHoney = 0;

// 벌(1), 벌(i), 꿀(N)
for (let i = 2; i < N; i++) {
  maxHoney = Math.max(maxHoney, sum[N] - arr[1] - arr[i] + (sum[N] - sum[i]));
}

// 벌(1), 꿀(i), 벌(N)
for (let i = 2; i < N; i++) {
  maxHoney = Math.max(maxHoney, sum[i] - arr[1] + (sum[N - 1] - sum[i - 1]));
}

// 꿀(1), 벌(i), 벌(N)
for (let i = 2; i < N; i++) {
  maxHoney = Math.max(maxHoney, sum[N - 1] - arr[i] + sum[i - 1]);
}

console.log(maxHoney);
