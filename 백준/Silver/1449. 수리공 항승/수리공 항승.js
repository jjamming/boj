//수리공 항승 #1449
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);

const broken = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let count = 1;
let tapeEnd = broken[0] + L - 1; // 제일 첫 구멍에 테이프 붙였을 때, 테이프가 커버하는 제일 우측 칸

// broken부터 L길이만큼 붙이기.
for (let x of broken) {
  if (x > tapeEnd) {
    // 현재 물이 새는 위치가 현재 붙이는 중인 테이프로 커버 안되는 위치임
    count++;
    tapeEnd = x + L - 1;
  }
}

console.log(count);
