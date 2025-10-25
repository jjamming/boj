// 2xn 타일링 #11726
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const dp = Array(n + 1).fill(0);

dp[1] = 1; // 1
dp[2] = 2; // 1 1 || 2

for (let i = 3; i <= n; i++) {
  // dp[n-1]과 dp[n-2]는 겹치지 않는 경우임
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}
console.log(dp[n]);
