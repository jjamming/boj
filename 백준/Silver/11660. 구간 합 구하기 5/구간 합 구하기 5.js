//구간 합 구하기 5 #11660
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const matrix = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
const sumArr = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
let answer = "";

let sum = 0;
for (let i = 1; i <= N; i++) {
  let line = input[i].split(" ").map(Number);
  for (let j = 1; j <= N; j++) {
    matrix[i][j] = line[j - 1];
    sumArr[i][j] =
      sumArr[i - 1][j] + sumArr[i][j - 1] - sumArr[i - 1][j - 1] + matrix[i][j];
  }
}

for (let t = 1; t <= M; t++) {
  const [x1, y1, x2, y2] = input[N + t].split(" ").map(Number);

  const result =
    sumArr[x2][y2] -
    sumArr[x1 - 1][y2] -
    sumArr[x2][y1 - 1] +
    sumArr[x1 - 1][y1 - 1];

  answer += result + "\n";
}

console.log(answer.trim());
