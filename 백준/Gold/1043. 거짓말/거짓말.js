//거짓말 #1043
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const truthInfo = input[1].split(" ").map(Number);
const truthCount = truthInfo[0];
const truthPeople = truthInfo.slice(1);

const parties = [];
for (let i = 2; i < 2 + M; i++) {
  const line = input[i].split(" ").map(Number);
  const count = line[0];
  const people = line.slice(1);
  parties.push(people);
}

const parent = Array(N + 1)
  .fill(0)
  .map((_, i) => i);

function find(x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return;
  parent[b] = a;
}

for (const people of parties) {
  if (people.length <= 1) continue;
  const first = people[0];
  for (let i = 1; i < people.length; i++) {
    union(first, people[i]);
  }
}

const truthRoots = new Set();
for (const p of truthPeople) {
  truthRoots.add(find(p));
}

let answer = 0;

if (truthCount === 0) {
  answer = M;
} else {
  for (const people of parties) {
    let knowTruth = false;
    for (const person of people) {
      if (truthRoots.has(find(person))) {
        knowTruth = true;
        break;
      }
    }
    if (!knowTruth) answer++;
  }
}

console.log(answer);
