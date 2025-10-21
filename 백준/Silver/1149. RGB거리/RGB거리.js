//RGB거리 #1149
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const costs = [];
const dp = Array.from({ length: N }, () => Array(3).fill(0)); // dp[i][c] === i번째 집을 c색으로 칠할 때의 최소 누적비용

for (let i = 1; i <= N; i++) {
  costs.push(input[i].split(" ").map(Number));
}

dp[0][0] = costs[0][0];
dp[0][1] = costs[0][1];
dp[0][2] = costs[0][2];

for (let i = 1; i < N; i++) {
  let [n0, n1, n2] = costs[i];

  dp[i][0] = Math.min(dp[i - 1][1] + n0, dp[i - 1][2] + n0);
  dp[i][1] = Math.min(dp[i - 1][0] + n1, dp[i - 1][2] + n1);
  dp[i][2] = Math.min(dp[i - 1][0] + n2, dp[i - 1][1] + n2);
}

let [R, G, B] = dp[N - 1];

console.log(Math.min(R, G, B));
