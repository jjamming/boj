//가장 긴 증가하는 부분 수열 #11053
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const arr = input[1].split(" ").map(Number);

const dp = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
      dp[i] = dp[j] + 1;
    }
  }
}

console.log(Math.max(...dp));
