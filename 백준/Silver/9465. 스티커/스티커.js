//스티커 #9465
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const T = Number(input[0]);
let line = 1;
let outputs = [];

for (let i = 0; i < T; i++) {
  const n = input[line++];
  const sticker = [];
  for (let j = 0; j < 2; j++) {
    sticker.push(input[line++].split(" ").map(Number));
  }

  const dp = Array.from({ length: 3 }, () => Array(n).fill(0));

  dp[0][0] = 0;
  dp[1][0] = sticker[0][0];
  dp[2][0] = sticker[1][0];

  for (let c = 1; c < n; c++) {
    // 현재 열에서 아무것도 안고르는 경우
    dp[0][c] = Math.max(dp[0][c - 1], dp[1][c - 1], dp[2][c - 1]);
    // 윗 행의 수를 고르는 경우 (이전 열은 아래([2]) or 선택X([0]))
    dp[1][c] = Math.max(dp[0][c - 1], dp[2][c - 1]) + sticker[0][c];
    // 아래 행의 수를 고르는 경우
    dp[2][c] = Math.max(dp[0][c - 1], dp[1][c - 1]) + sticker[1][c];
  }

  const answer = Math.max(dp[0][n - 1], dp[1][n - 1], dp[2][n - 1]);
  outputs.push(answer.toString());
}

console.log(outputs.join("\n"));
