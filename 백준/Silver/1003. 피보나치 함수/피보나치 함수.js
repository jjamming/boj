//피보나치 함수 #1003
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const testCase = Number(input[0]);
let answer = "";

for (let i = 1; i <= testCase; i++) {
  const N = Number(input[i]);
  let dp = Array(N + 1).fill(() => [0, 0]); // [zeroCount, oneCount]
  dp[0] = [1, 0];
  dp[1] = [0, 1];
  for (let j = 2; j <= N; j++) {
    dp[j] = [dp[j - 1][0] + dp[j - 2][0], dp[j - 1][1] + dp[j - 2][1]];
  }

  answer += dp[N][0] + " " + dp[N][1] + "\n";
}

console.log(answer.trim());
