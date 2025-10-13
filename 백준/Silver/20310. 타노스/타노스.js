const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const str = input[0];

let arr = Array(str.length).fill(true);
let zeroCount = 0;
let oneCount = 0;
for (let s of str) {
  if (s === "0") zeroCount++;
  if (s === "1") oneCount++;
}

zeroCount = Math.floor(zeroCount / 2);
oneCount = Math.floor(oneCount / 2);

for (let i = 0; i < str.length && oneCount > 0; i++) {
  if (str[i] === "1") {
    arr[i] = false;
    oneCount--;
  }
}

for (let i = str.length - 1; i >= 0 && zeroCount > 0; i--) {
  if (str[i] === "0" && arr[i]) {
    arr[i] = false;
    zeroCount--;
  }
}

let answer = "";

for (let i = 0; i < str.length; i++) {
  if (arr[i]) answer += str[i];
}

console.log(answer);
