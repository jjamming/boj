// 1, 2, 3 더하기 #9095
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const T = Number(input[0]);
const cases = [];

for (let i = 1; i <= T; i++) {
  cases.push(Number(input[i]));
}

const max = Math.max(...cases);
const dp = Array(max + 1).fill(0);

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= max; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

let answer = "";

for (let num of cases) {
  answer += dp[Number(num)] + "\n";
}

console.log(answer.trim());
