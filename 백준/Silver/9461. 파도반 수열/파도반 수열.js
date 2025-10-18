//파도반 수열 #9461
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let testCase = Number(input[0]);

for (let tc = 1; tc <= testCase; tc++) {
  let N = Number(input[tc]);
  let dp = new Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    if (i <= 3) {
      dp[i] = 1;
    } else if (i > 3 && i <= 5) {
      dp[i] = 2;
    } else {
      dp[i] = dp[i - 1] + dp[i - 5];
    }
  }

  console.log(dp[N]);
}
