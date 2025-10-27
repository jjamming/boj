//1,2,3 더하기 4 #15989
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const tc = Number(input[0]);
const cases = [];
let MAX = 0;
for (let i = 1; i <= tc; i++) {
  cases.push(Number(input[i]));
  MAX = Math.max(MAX, Number(input[i]));
}

let dp = Array.from({ length: MAX + 1 }, () => Array(4).fill(0));

// dp[i][j] === j(1,2,3) 이하의 수를 사용하여 i를 만드는 경우의 수
dp[1][1] = 1; // 1
dp[1][2] = 1;
dp[1][3] = 1;
dp[2][1] = 1; // 1+1
dp[2][2] = 2; // 1+1, 2
dp[2][3] = 2;
dp[3][1] = 1; // 1+1+1
dp[3][2] = 2; // 1+1+1, 1+2
dp[3][3] = 3; // 1+1+1, 1+2, 3

for (let i = 4; i <= MAX; i++) {
  dp[i][1] = 1; // 1 * i
  dp[i][2] = dp[i][1] + dp[i - 2][2]; // 1로만 구성 + (i-2를 1,2로만 구성하는 경우 + 2)
  dp[i][3] = dp[i][2] + dp[i - 3][3];
}

let answer = "";
for (let item of cases) {
  answer += dp[Number(item)][3] + "\n";
}

console.log(answer.trim());
