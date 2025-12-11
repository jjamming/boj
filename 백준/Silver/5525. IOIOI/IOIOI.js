//IOIOI #5525
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const S = Number(input[1]);
const str = input[2].split("");

/**
 * n = 1 , IOI , OI == 1
 * n = 2 , IOIOI, OI == 2
 */

let count = 0;
for (let i = 0; i < S; i++) {
  if (str[i] === "I") {
    const sliced = str.slice(i + 1, i + 1 + N * 2);
    const flag = checkIOI(N, sliced);
    if (flag) count++;
  }
}

console.log(count);

function checkIOI(N, str) {
  // I 이후 N * 2 만큼의 원소를 전달받아서, OI 가 반복되나 확인
  const N2 = str.length;

  if (N2 < 2 * N) return false;

  for (let i = 0; i < N2; i++) {
    if (i % 2 === 0 && str[i] !== "O") return false;
    if (i % 2 === 1 && str[i] !== "I") return false;
  }

  return true;
}
