// 퇴사 #14501, 삼성문제집
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);

const T = [0];
const P = [0];

for (let i = 1; i <= n; i++) {
  T.push(input[i].split(" ").map(Number)[0]);
  P.push(input[i].split(" ").map(Number)[1]);
}

const dp = new Array(n + 2).fill(0);
for (let i = n; i >= 1; i--) {
  const end = i + T[i]; // 상담을 진행한다면 끝나는 날짜
  if (end <= n + 1) {
    // 오늘 상담을 해도 되는 경우
    dp[i] = Math.max(P[i] + dp[end], dp[i + 1]);
  } else {
    // 오늘 상담을 못하는 경우
    dp[i] = dp[i + 1];
  }
}

console.log(dp[1]);
