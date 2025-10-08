//로또 #6603
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let line = 0;
let output = "";

while (true) {
  let [k, ...arr] = input[line++].split(" ").map(Number);
  if (k === 0) break;

  if (line !== 1) console.log("");
  dfs(arr, 0, 0, []);
}

function dfs(arr, depth, idx, selected) {
  if (depth === 6) {
    let answer = "";
    for (let i of selected) {
      answer += i + " ";
    }
    console.log(answer.trim());
    return;
  }

  for (let i = idx; i < arr.length; i++) {
    if (6 - selected.length > arr.length - idx) continue;
    selected.push(arr[i]);
    dfs(arr, depth + 1, i + 1, selected);
    selected.pop();
  }
}
