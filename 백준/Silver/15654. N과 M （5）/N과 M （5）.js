//N과 M(5) #15654
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const selected = [];
const visited = Array(N).fill(false);
let answer = "";

function dfs(depth) {
  if (depth === M) {
    for (let num of selected) {
      answer += num + " ";
    }
    answer += "\n";
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

console.log(answer.trim());
