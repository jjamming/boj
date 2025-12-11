//과일 탕후루 #30804
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const arr = [...input[1].split(" ").map(Number)];

const freq = new Map();

let left = 0;
let right = 0;

let answer = 0;

while (right < N) {
  let fruit = arr[right++];
  freq.set(fruit, (freq.get(fruit) || 0) + 1);
  let kinds = freq.size;

  while (kinds > 2) {
    let del = arr[left++];
    freq.set(del, freq.get(del) - 1);

    if (freq.get(del) === 0) freq.delete(del);
    kinds--;
  }

  let count = right - left;

  answer = Math.max(answer, count);
}

console.log(answer);
