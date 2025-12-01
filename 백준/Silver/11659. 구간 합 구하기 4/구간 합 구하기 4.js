//구간 합 구하기 4 #11659
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = [0, ...input[1].split(" ").map(Number)];
const sum = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  sum[i] = sum[i - 1] + arr[i];
}

let answer = "";
for (let i = 0; i < M; i++) {
  const [a, b] = input[i + 2].split(" ").map(Number);
  answer += sum[b] - sum[a - 1] + "\n";
}

console.log(answer.trim());
