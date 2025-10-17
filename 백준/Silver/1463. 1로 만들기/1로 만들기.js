//1로 만들기 #1463
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const dp = new Array(N + 1).fill(0);

// dp[i] === 1에서 i까지 가는데 필요한 최소 연산
dp[1] = 0;

for (let i = 2; i <= N; i++) {
  if (i % 6 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 3] + 1, dp[i / 2] + 1);
  } else if (i % 3 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 3] + 1);
  } else if (i % 2 === 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1);
  } else {
    dp[i] = dp[i - 1] + 1;
  }
}

console.log(dp[N]);
