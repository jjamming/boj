// 빈도 정렬 #2910
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").map(Number);
const freq = new Map(); // [숫자, 빈도]

// arr 돌며 각 숫자의 빈도를 쌓음
for (let i = 0; i < N; i++) {
  let num = arr[i];
  freq.set(num, (freq.get(num) || 0) + 1);
}

// freq 돌며 빈도별로 정렬
const sorted = [...freq].sort((a, b) => {
  if (a[1] === b[1]) return a - b;
  else return b[1] - a[1];
});

// freq 돌며 빈도만큼 숫자 출력
let answer = "";
for (let i = 0; i < [...freq].length; i++) {
  let count = sorted[i][1];
  while (count > 0) {
    answer += sorted[i][0] + " ";
    count--;
  }
}

console.log(answer.trim());
