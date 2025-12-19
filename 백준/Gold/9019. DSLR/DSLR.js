//DSLR #9019
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const T = Number(input[0]);

const op = new Map([
  ["D", (n) => (n * 2) % 10000],
  ["S", (n) => (n === 0 ? 9999 : n - 1)],
  ["L", (n) => (n % 1000) * 10 + Math.floor(n / 1000)],
  ["R", (n) => (n % 10) * 1000 + Math.floor(n / 10)],
]);

let line = 1;
let answer = [];
for (let t = 0; t < T; t++) {
  const [A, B] = input[line++].split(" ").map(Number);

  const prev = Array(10000).fill(-1);
  const prevOp = Array(10000).fill("");

  const queue = Array(10000);
  let head = 0;
  let tail = 0;

  prev[A] = A;
  queue[tail++] = A;

  while (head < tail) {
    const cur = queue[head++];

    if (cur === B) break;

    for (const [ch, fn] of op) {
      const next = fn(cur);

      if (prev[next] !== -1) continue;

      prev[next] = cur;
      prevOp[next] = ch;
      queue[tail++] = next;
    }
  }

  let cur = B;
  let ans = [];

  while (cur !== A) {
    ans.push(prevOp[cur]);
    cur = prev[cur];
  }

  answer.push(ans.reverse().join(""));
}

console.log(answer.join("\n"));
