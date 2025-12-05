// N과 M (4) #15652
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = [];
const selected = [];
const output = [];
function dfs(idx, depth) {
  if (depth === M) {
    output.push(selected.join(" "));
    return;
  }

  for (let i = idx; i <= N; i++) {
    selected.push(i);
    dfs(i, depth + 1);
    selected.pop();
  }
}

dfs(1, 0);
console.log(output.join("\n").trim());
