//파이프 옮기기 1 #17070
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const matrix = [[]];

for (let i = 1; i <= N; i++) {
  matrix.push([0, ...input[i].split(" ").map(Number)]);
}

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => [0, 0, 0])
);

dp[1][2][0] = 1;

for (let x = 1; x <= N; x++) {
  for (let y = 3; y <= N; y++) {
    if (matrix[x][y] === 1) continue;

    dp[x][y][0] += dp[x][y - 1][0] + dp[x][y - 1][2];

    if (x - 1 >= 1) {
      dp[x][y][1] += dp[x - 1][y][1] + dp[x - 1][y][2];
    }

    if (
      x - 1 >= 1 &&
      y - 1 >= 1 &&
      matrix[x - 1][y] === 0 &&
      matrix[x][y - 1] === 0
    ) {
      dp[x][y][2] +=
        dp[x - 1][y - 1][0] + dp[x - 1][y - 1][1] + dp[x - 1][y - 1][2];
    }
  }
}

const answer = dp[N][N][0] + dp[N][N][1] + dp[N][N][2];
console.log(answer);
