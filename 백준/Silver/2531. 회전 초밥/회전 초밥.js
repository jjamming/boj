// 회전 초밥 #2531
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, d, k, c] = input[0].split(" ").map(Number);

let dishes = [];

for (let i = 1; i <= N; i++) {
  dishes.push(Number(input[i]));
}

dishes = [...dishes, ...dishes];

const count = Array(d + 1).fill(0);

let kinds = 0;
for (let i = 0; i < k; i++) {
  if (count[dishes[i]]++ === 0) kinds++;
}

let answer = kinds + (count[c] === 0 ? 1 : 0);

for (let i = 0; i < N; i++) {
  const out = dishes[i];
  if (--count[out] === 0) kinds--;

  const inn = dishes[i + k];
  if (count[inn]++ === 0) kinds++;

  const withCoupon = kinds + (count[c] === 0 ? 1 : 0);
  if (withCoupon > answer) answer = withCoupon;
}

console.log(answer);
