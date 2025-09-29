// 연산자 끼워넣기 #14888
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);

let num = input[1].split(" ").map(Number);

let sign = input[2].split(" ").map(Number);

let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;

const calculate = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => parseInt(a / b),
];

function dfs(sum, idx) {
  if (idx === n - 1) {
    min = Math.min(min, sum);
    max = Math.max(max, sum);
    return;
  } else {
    for (let i = 0; i < sign.length; i++) {
      if (sign[i] === 0) continue;
      sign[i]--;
      dfs(calculate[i](sum, num[idx + 1]), idx + 1);
      sign[i]++;
    }
  }
}

dfs(num[0], 0);
console.log(max ? max : 0);
console.log(min ? min : 0);
