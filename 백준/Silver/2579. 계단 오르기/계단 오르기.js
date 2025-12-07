// 계단 오르기 #2579
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);
const stair = Array(n + 1).fill(0);
const dp = Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  stair[i] = Number(input[i]);
}
if (n === 1) {
  console.log(stair[1]);
  process.exit(0);
}

if (n === 2) {
  console.log(stair[1] + stair[2]);
  process.exit(0);
}

dp[1] = stair[1];
dp[2] = stair[1] + stair[2];
dp[3] = Math.max(stair[1] + stair[3], stair[2] + stair[3]);

for (let i = 4; i <= n; i++) {
  dp[i] = Math.max(dp[i - 3] + stair[i - 1] + stair[i], dp[i - 2] + stair[i]);
}

console.log(dp[n]);
