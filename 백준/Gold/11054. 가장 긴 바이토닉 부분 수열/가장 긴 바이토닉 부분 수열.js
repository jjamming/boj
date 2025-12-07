//가장 긴 바이토닉 부분 수열 #11054
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const incDP = Array(N + 1).fill(1);
const decDP = Array(N + 1).fill(1);

const arr = input[1].split(" ").map(Number);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i] && incDP[j] + 1 > incDP[i]) {
      incDP[i] = incDP[j] + 1;
    }
  }
}

for (let i = N - 1; i >= 0; i--) {
  for (let j = N - 1; j > i; j--) {
    if (arr[j] < arr[i] && decDP[j] + 1 > decDP[i]) {
      decDP[i] = decDP[j] + 1;
    }
  }
}

let answer = 0;
for (let i = 0; i < N; i++) {
  answer = Math.max(incDP[i] + decDP[i] - 1, answer);
}

console.log(answer);
