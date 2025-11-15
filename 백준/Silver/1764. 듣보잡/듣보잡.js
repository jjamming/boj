//듣보잡 #1764
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

let hearSet = new Set();
let seeSet = new Set();

for (let i = 1; i <= n; i++) {
  hearSet.add(input[i]);
}

for (let i = n + 1; i < n + 1 + m; i++) {
  seeSet.add(input[i]);
}

const intersection = [...hearSet].filter((v) => seeSet.has(v));
intersection.sort();

console.log(intersection.length);

console.log(intersection.join("\n"));
