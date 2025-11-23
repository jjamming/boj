//사탕게임 #3085
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const matrix = [];
let maxCnt = 0;

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(""));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (j < N - 1) {
      swap(i, j, i, j + 1);
      let max = getMax(matrix);
      maxCnt = Math.max(max, maxCnt);
      swap(i, j, i, j + 1);
    }

    if (i < N - 1) {
      swap(i, j, i + 1, j);
      let max = getMax(matrix);
      maxCnt = Math.max(max, maxCnt);
      swap(i, j, i + 1, j);
    }
  }
}

console.log(maxCnt);

function swap(x1, y1, x2, y2) {
  const tmp = matrix[x1][y1];
  matrix[x1][y1] = matrix[x2][y2];
  matrix[x2][y2] = tmp;
}

function getMax(matrix) {
  const N = matrix.length;
  let maxCnt = 1;

  for (let i = 0; i < N; i++) {
    let cnt = 1;
    for (let j = 1; j < N; j++) {
      if (matrix[i][j] === matrix[i][j - 1]) cnt++;
      else {
        maxCnt = Math.max(maxCnt, cnt);
        cnt = 1;
      }
    }
    maxCnt = Math.max(maxCnt, cnt);
  }

  for (let j = 0; j < N; j++) {
    let cnt = 1;
    for (let i = 1; i < N; i++) {
      if (matrix[i][j] === matrix[i - 1][j]) cnt++;
      else {
        maxCnt = Math.max(maxCnt, cnt);
        cnt = 1;
      }
    }
    maxCnt = Math.max(maxCnt, cnt);
  }

  return maxCnt;
}
