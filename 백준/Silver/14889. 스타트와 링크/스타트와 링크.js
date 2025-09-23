// 스타트와 링크 #14889, DFS
let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input[0]);
let matrix = [];

for (let i = 1; i <= n; i++) {
  let line = input[i].split(" ").map(Number);
  matrix.push(line);
}

let current = Number.MAX_SAFE_INTEGER;
let visited = new Array(n).fill(false);

function dfs(depth, member) {
  if (depth === n / 2) {
    let sTeam = [];
    let lTeam = [];
    for (let i = 0; i < n; i++) {
      // visited == sTeam
      if (visited[i]) sTeam.push(i);
      else lTeam.push(i);
    }

    let sSum = 0;
    let lSum = 0;

    for (let i = 0; i < n / 2; i++) {
      for (let j = i + 1; j < n / 2; j++) {
        sSum += matrix[sTeam[i]][sTeam[j]] + matrix[sTeam[j]][sTeam[i]];
        lSum += matrix[lTeam[i]][lTeam[j]] + matrix[lTeam[j]][lTeam[i]];
      }
    }

    let sumDiff = Math.abs(sSum - lSum);
    if (sumDiff < current) current = sumDiff;
    return;
  }

  for (let i = member; i < n; i++) {
    visited[i] = true;
    dfs(depth + 1, i + 1);
    visited[i] = false;
  }
}

dfs(0, 0);
console.log(current);
