const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let answer = "";
const selected = [];

function dfs(idx, depth) {
  if (depth === M) {
    answer += selected.join(" ").trim() + "\n";
    return;
  }

  for (let i = idx; i <= N; i++) {
    selected.push(i);
    dfs(i + 1, depth + 1);
    selected.pop();
  }
}

dfs(1, 0);

console.log(answer.trim());
