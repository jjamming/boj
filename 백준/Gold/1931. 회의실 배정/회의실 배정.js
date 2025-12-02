// 회의실 배정 #1931
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const conference = [];

for (let i = 1; i <= N; i++) {
  conference.push(input[i].split(" ").map(Number));
}

conference.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  else return a[1] - b[1];
});

const visited = Array(N + 1).fill(false);
let count = 0;
let lastEnd = 0;

for (const [start, end] of conference) {
  if (start >= lastEnd) {
    count++;
    lastEnd = end;
  }
}

console.log(count);
