//균형잡힌 세상 #4949
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let line = 0;

while (input[line] !== ".") {
  // console.log(input[line]);
  let sentence = input[line];
  let stack = [];

  let i = 0;
  let flag = true;
  while (sentence[i] !== ".") {
    let c = sentence[i];
    if (c === "(") {
      stack.push(0);
    }
    if (c === "[") {
      stack.push(1);
    }
    if (c === ")") {
      if (stack.length === 0 || stack.pop() === 1) {
        flag = false;
        break;
      }
    }
    if (c === "]") {
      if (stack.length === 0 || stack.pop() === 0) {
        flag = false;
        break;
      }
    }
    i++;
  }
  if (stack.length > 0) flag = false;
  console.log(flag ? "yes" : "no");
  line++;
}
