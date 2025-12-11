//IOIOI #5525
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const S = Number(input[1]);
const str = input[2];

let count = 0;
let combo = 0;
let i = 1;

while (i < S - 1) {
  if (str[i - 1] === "I" && str[i] === "O" && str[i + 1] === "I") {
    combo++;

    if (combo === N) {
      count++;
      combo--;
    }

    i += 2;
  } else {
    combo = 0;
    i++;
  }
}

console.log(count);
