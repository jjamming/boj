// 피보나치 수 6 #11444
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = BigInt(input[0]);
const MOD = 1000000007n;

function fib(n) {
  if (n === 0n) return [0n, 1n];

  const [a, b] = fib(n >> 1n);

  const c = (a * ((2n * b - a + MOD) % MOD)) % MOD;

  const d = (((a * a) % MOD) + ((b * b) % MOD)) % MOD;

  if (n & 1n) {
    return [d, (c + d) % MOD];
  } else {
    return [c, d];
  }
}

const [fn] = fib(n);
console.log((fn % MOD).toString());
