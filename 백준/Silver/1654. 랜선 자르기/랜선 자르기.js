//랜선 자르기 #1654
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [K, N] = input[0].split(" ").map(Number);
const lines = [];

for (let i = 1; i <= K; i++) {
  lines.push(Number(input[i]));
}

let left = 1;
let right = Math.max(...lines);

let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let count = 0;
  for (let len of lines) {
    count += Math.floor(len / mid);
  }

  if (count >= N) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
