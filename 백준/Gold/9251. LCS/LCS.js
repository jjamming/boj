//LCS #9251
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const A = input[0].trim();
const B = input[1].trim();

const aLen = A.length;
const bLen = B.length;

const dp = Array.from({ length: aLen + 1 }, () => Array(bLen + 1).fill(0));

for (let i = 1; i <= aLen; i++) {
  for (let j = 1; j <= bLen; j++) {
    if (A[i - 1] === B[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[aLen][bLen]);
