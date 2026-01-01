//문자열 폭발 #9935
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const str = input[0];
const bomb = input[1];
const bombLen = bomb.length;

const stack = [];

for (let i = 0; i < str.length; i++) {
  const char = str[i];

  stack.push(char);

  if (stack[stack.length - 1] === bomb[bombLen - 1]) {
    let isBomb = true;

    for (let j = 0; j < bombLen; j++) {
      if (stack[stack.length - 1 - j] !== bomb[bombLen - 1 - j]) {
        isBomb = false;
        break;
      }
    }

    if (isBomb) {
      for (let j = 0; j < bombLen; j++) {
        stack.pop();
      }
    }
  }
}

if (stack.length === 0) {
  console.log("FRULA");
} else {
  console.log(stack.join(""));
}
