//나는야 포켓몬 마스터 이다솜 #1620
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const numToNameMap = new Map();
const nameToNumMap = new Map();
let answer = "";
let line = 1;
for (let i = 1; i <= N; i++) {
  let name = input[i];
  numToNameMap.set(i, name);
  nameToNumMap.set(name, i);
  line++;
}

for (let i = 1; i <= M; i++) {
  let question = input[line++];
  if (isNaN(question)) {
    answer += nameToNumMap.get(question) + "\n";
  } else {
    answer += numToNameMap.get(Number(question)) + "\n";
  }
}

console.log(answer.trim());
