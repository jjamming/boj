//1로 만들기2 #12852
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const dp = new Array(N + 1).fill(0);
const prev = new Array(N + 1).fill(0);

// dp[i] === 1에서 i까지 가는데 필요한 최소 연산
dp[1] = 0;
prev[1] = 0;

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  prev[i] = i - 1;

  if (i % 2 === 0 && dp[i] > dp[(i / 2) | 0] + 1) {
    dp[i] = dp[(i / 2) | 0] + 1;
    prev[i] = (i / 2) | 0;
  }
  if (i % 3 === 0 && dp[i] > dp[(i / 3) | 0] + 1) {
    dp[i] = dp[(i / 3) | 0] + 1;
    prev[i] = (i / 3) | 0;
  }
}

const path = [];
let cur = N;
while (cur !== 0) {
  path.push(cur);
  cur = prev[cur];
}

console.log(dp[N]);
console.log(path.join(" "));
