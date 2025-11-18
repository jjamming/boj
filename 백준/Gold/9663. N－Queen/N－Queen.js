//N-Queen #9663
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

let answer = 0;
const col = Array(N).fill(false); // 해당 열에 있다면 true
const diag1 = Array(2 * N - 1).fill(false);
const diag2 = Array(2 * N - 1).fill(false);

function nQueen(row) {
  if (row === N) {
    answer++;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (col[i] || diag1[row + i] || diag2[row - i + N - 1]) continue;

    col[i] = true;
    diag1[row + i] = true;
    diag2[row - i + N - 1] = true;

    nQueen(row + 1);

    col[i] = false;
    diag1[row + i] = false;
    diag2[row - i + N - 1] = false;
  }
}

nQueen(0);

console.log(answer);
