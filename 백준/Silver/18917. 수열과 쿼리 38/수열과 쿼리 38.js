//수열과 쿼리 38 #18917
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const m = Number(input[0]);

let arr = [0];
let sum = 0;
let xor = 0;
let answer = "";

for (let i = 1; i <= m; i++) {
  let [query, x] = input[i].split(" ").map(Number);
  switch (query) {
    case 1:
      arr.push(x);
      sum += x;
      xor ^= x;
      break;
    case 2:
      sum -= x;
      xor ^= x;
      break;
    case 3:
      answer += sum + "\n";
      break;
    case 4:
      answer += xor + "\n";
      break;
    default:
      break;
  }
}

console.log(answer.trim());
