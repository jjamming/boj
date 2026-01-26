// 본대 산책2 #12850
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const D = BigInt(input[0]);
const MOD = 1000000007n;

let matrix = [
  [0n, 1n, 1n, 0n, 0n, 0n, 0n, 0n], // 0
  [1n, 0n, 1n, 1n, 0n, 0n, 0n, 0n], // 1
  [1n, 1n, 0n, 1n, 1n, 0n, 0n, 0n], // 2
  [0n, 1n, 1n, 0n, 1n, 1n, 0n, 0n], // 3
  [0n, 0n, 1n, 1n, 0n, 1n, 0n, 1n], // 4
  [0n, 0n, 0n, 1n, 1n, 0n, 1n, 0n], // 5
  [0n, 0n, 0n, 0n, 0n, 1n, 0n, 1n], // 6
  [0n, 0n, 0n, 0n, 1n, 0n, 1n, 0n], // 7
];

function multiply(A, B) {
  const C = Array.from({ length: 8 }, () => Array(8).fill(0n));
  for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 8; k++) {
      for (let j = 0; j < 8; j++) {
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
      }
    }
  }
  return C;
}

function power(A, n) {
  let res = Array.from({ length: 8 }, (_, i) =>
    Array.from({ length: 8 }, (_, j) => (i === j ? 1n : 0n)),
  );

  while (n > 0n) {
    if (n % 2n === 1n) res = multiply(res, A);
    A = multiply(A, A);
    n = n / 2n;
  }
  return res;
}

const finalMatrix = power(matrix, D);
console.log(finalMatrix[0][0].toString());
