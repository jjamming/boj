//N과 M (12) #15666
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const selected = [];
const answer = [];

function dfs(depth, start) {
  if (depth === M) {
    answer.push(selected.join(" "));
    return;
  }

  let lastUsed = -1;

  for (let i = start; i < N; i++) {
    if (arr[i] === lastUsed) continue;
    lastUsed = arr[i];

    selected.push(arr[i]);
    dfs(depth + 1, i);
    selected.pop();
  }
}

dfs(0, 0);

console.log(answer.join("\n"));
