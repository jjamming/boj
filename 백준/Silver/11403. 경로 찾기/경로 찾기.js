//경로 찾기 #11403
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);
const nodes = [];

for (let i = 1; i <= n; i++) {
  nodes.push(input[i].split(" ").map(Number));
}

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (nodes[i][j] === 1) continue;

      if (nodes[i][k] === 1 && nodes[k][j] === 1) nodes[i][j] = 1;
    }
  }
}

let answer = "";
for (let line of nodes) {
  let str = line.join(" ");
  answer += str + "\n";
}

console.log(answer.trim());
