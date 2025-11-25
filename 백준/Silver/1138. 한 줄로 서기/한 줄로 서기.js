// 한 줄로 서기 #1138
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const line = Array(N).fill(-1);

for (let person = 1; person <= N; person++) {
  let emptyCount = arr[person - 1];
  for (let i = 0; i < N; i++) {
    if (line[i] === -1 && emptyCount === 0) {
      line[i] = person;
      break;
    } else if (line[i] === -1) {
      emptyCount--;
    }
  }
}

console.log(line.join(" "));
