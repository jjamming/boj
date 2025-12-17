//AC #5430
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const T = Number(input[0]);

let line = 1;
let answer = "";

for (let t = 0; t < T; t++) {
  const operation = input[line++].split("");
  const N = Number(input[line++]);
  const li = input[line++];
  const arr = li === "[]" ? [] : li.slice(1, -1).split(",").map(Number);
  let head = 0;
  let tail = N - 1;
  let isReverse = false;

  let ans = "";

  for (let op of operation) {
    if (op === "R") {
      isReverse = !isReverse;
    } else {
      if (head > tail) {
        ans = "error";
        break;
      }

      if (isReverse) {
        tail--;
      } else {
        head++;
      }
    }
  }

  let tmp = [];
  if (isReverse) {
    while (head <= tail) tmp.push(arr[tail--]);
  } else {
    while (head <= tail) tmp.push(arr[head++]);
  }

  if (ans === "error") {
    answer += ans + "\n";
  } else {
    ans = "[" + tmp.join(",") + "]";
    answer += ans + "\n";
  }
}

console.log(answer.trim());
