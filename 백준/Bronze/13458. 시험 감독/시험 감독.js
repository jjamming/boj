//시험 감독 #13458
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

let students = input[1].split(" ").map(Number);

const [main, sub] = input[2].split(" ").map(Number);

let count = 0;

for (let i = 0; i < N; i++) {
  students[i] -= main;
  count++;

  if (students[i] > 0) {
    count += Math.ceil(students[i] / sub);
  }
}

console.log(count);
