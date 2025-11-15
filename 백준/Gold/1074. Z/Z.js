//Z #1074
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let [N, r, c] = input[0].split(" ").map(Number);

let answer = 0;
let offset = 0;

while (N > 0) {
  let half = 2 ** (N - 1);
  if (r < half && c < half) {
    // 2사분면(좌측상단)
    offset = 0;
  } else if (r < half && c >= half) {
    // 1사분면(우측상단)
    offset = 1 * half * half;
    c -= half;
  } else if (r >= half && c < half) {
    // 3사분면(좌측하단)
    offset = 2 * half * half;
    r -= half;
  } else {
    // 4사분면(우측하단)
    offset = 3 * half * half;
    r -= half;
    c -= half;
  }
  answer += offset;
  N--;
}

console.log(answer);
