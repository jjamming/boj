//문자열 교환 #1522
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const str = (input[0] + input[0]).split("");
let aCount = 0;
const N = str.length / 2;

let minB = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
  if (str[i] === "a") aCount++;
}

// idea: a개수만큼의 윈도우를 돌며 b의 카운트를 셈. 가장 작은 값만큼만 옮기면 된다
// 원형을 구현하기 위해 N 2바퀴를 원형으로 돌며 순회
for (let i = 0; i < N; i++) {
  let bCount = 0;
  for (let j = i; j < i + aCount; j++) {
    if (str[j] === "b") bCount++;
  }
  minB = Math.min(bCount, minB);
}

console.log(minB);
