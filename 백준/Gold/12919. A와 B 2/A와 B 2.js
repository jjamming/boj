//A와 B 2 #12919
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const S = input[0];
const T = input[1];

let found = false;

// T에서 경우의 수 별로 제거하며 진행
function dfs(current) {
  if (current === S) {
    found = true;
    return;
  }
  if (current.length < S.length) return;

  if (current.endsWith("A")) {
    // A를 제외함
    dfs(current.slice(0, -1));
  }

  if (current.startsWith("B")) {
    // 뒤집고 B 제외
    let reversed = [...current].reverse().join("");
    dfs(reversed.slice(0, -1));
  }
}

dfs(T);
console.log(found ? 1 : 0);
