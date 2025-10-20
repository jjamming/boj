//가장 긴 짝수 연속한 부분 수열 (large) #22862
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const arr = input[1].split(" ").map(Number);

let count = 0;
let left = 0;
let right = 0;
let removed = 0;

while (right < N) {
  if (arr[right] % 2 === 0) {
    count = Math.max(count, right - left - removed + 1);
    right++;
  } else {
    if (removed < K) {
      removed++;
      right++;
    } else {
      // 이미 K개 제거했다면, 왼쪽 윈도우를 한칸 옮김(홀수 나올 때까지)
      while (removed === K) {
        if (arr[left] % 2 === 1) removed--;
        left++;
      }
    }
  }
}

console.log(count);
