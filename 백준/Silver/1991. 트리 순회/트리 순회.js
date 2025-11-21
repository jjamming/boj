//트리 순회 #1991
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const tree = {};

let answer = "";

for (let i = 1; i <= N; i++) {
  const [node, left, right] = input[i].split(" ");
  tree[node] = [left, right];
}

function preorder(node) {
  if (node === ".") return;

  const [left, right] = tree[node];
  answer += node;
  preorder(left);
  preorder(right);
}

function inorder(node) {
  if (node === ".") return;

  const [left, right] = tree[node];
  inorder(left);
  answer += node;
  inorder(right);
}

function postorder(node) {
  if (node === ".") return;

  const [left, right] = tree[node];
  postorder(left);
  postorder(right);
  answer += node;
}

preorder("A");
answer += "\n";
inorder("A");
answer += "\n";
postorder("A");

console.log(answer);
