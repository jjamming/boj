//후위 표기식 #1918
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const infix = input[0].split("");
const N = infix.length;
const sign = [];
const answer = [];

function priority(sign) {
  if (sign === "*" || sign === "/") return 2;
  if (sign === "+" || sign === "-") return 1;
  return 0;
}

for (let i = 0; i < N; i++) {
  const ch = infix[i];

  if (/[A-Z]/.test(ch)) {
    answer.push(ch);
    continue;
  } else if (ch === "(") {
    sign.push(ch);
  } else if (ch === ")") {
    while (sign.length > 0 && sign[sign.length - 1] !== "(") {
      answer.push(sign.pop());
    }
    sign.pop(); // "(" 버림
  } else {
    const prior = priority(ch);
    while (
      sign.length > 0 &&
      priority(sign[sign.length - 1]) >= prior &&
      sign[sign.length - 1] !== "("
    ) {
      answer.push(sign.pop());
    }
    sign.push(ch);
  }
}

while (sign.length > 0) {
  answer.push(sign.pop());
}

console.log(answer.join(""));
