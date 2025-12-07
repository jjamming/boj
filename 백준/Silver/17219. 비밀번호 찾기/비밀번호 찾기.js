// 비밀번호 찾기 #17219
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const note = new Map();

for (let i = 1; i <= N; i++) {
  const [addr, password] = input[i].split(" ");
  note.set(addr, password);
}

let answer = "";

for (let i = 1; i <= M; i++) {
  const required = input[i + N];
  answer += note.get(required) + "\n";
}

console.log(answer.trim());
