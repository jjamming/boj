//이진 검색 트리 #5639
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const tree = [];
let line = 0;

while (true) {
  const node = input[line++];

  if (!node) break;

  tree.push(Number(node));
}

answer = [];

function solve(start, end) {
  if (start > end) return;

  const root = tree[start];

  let idx = start + 1;

  while (idx <= end && tree[idx] < root) {
    idx++;
  }

  solve(start + 1, idx - 1);
  solve(idx, end);

  answer.push(root);
}

solve(0, tree.length - 1);

console.log(answer.join("\n"));
