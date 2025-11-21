//N과 M(9) #15663
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const selected = [];
const visited = Array(N).fill(false);
let permutation = [];
let answer = "";

function dfs(depth) {
  if (depth === M) {
    let line = "";
    for (let num of selected) {
      line += num + " ";
    }
    permutation.push(line);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    selected.push(arr[i]);
    dfs(depth + 1);
    selected.pop();
    visited[i] = false;
  }
}

dfs(0);

permutation = [...new Set(permutation)];

for (let line of permutation) {
  answer += line + "\n";
}
console.log(answer.trim());
