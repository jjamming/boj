//정수 삼각형 #1932
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const triangle = [];

for (let i = 1; i <= N; i++) {
  triangle.push(input[i].split(" ").map(Number));
}

for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0) triangle[i][0] += triangle[i - 1][0];
    else if (j === i) triangle[i][j] += triangle[i - 1][j - 1];
    else triangle[i][j] += Math.max(triangle[i - 1][j], triangle[i - 1][j - 1]);
  }
}

console.log(Math.max(...triangle[N - 1]));
