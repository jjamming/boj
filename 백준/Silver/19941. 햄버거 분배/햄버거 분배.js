//햄버거 분배 #19941
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const table = input[1].split("");

// 슬라이딩 윈도우 인덱스, visited 배열(먹힌 햄버거 or 먹은 사람), answer, 현재 먹은 사람(지역)
let slidingIdx = 0;
let visited = new Array(N).fill(false);
let answer = 0;

// idea: 투포인터. 사람을 기준으로 반복. 슬라이딩 윈도우 최적화
for (let i = 0; i < N; i++) {
  if (table[i] === "H" || visited[i]) continue;

  // 슬라이딩 윈도우 최적화 없이
  for (
    slidingIdx = Math.max(i - K, 0);
    slidingIdx <= Math.min(i + K, N - 1);
    slidingIdx++
  ) {
    if (table[slidingIdx] === "H" && !visited[slidingIdx]) {
      answer++;
      visited[i] = true;
      visited[slidingIdx] = true;
      break;
    }
  }
}

console.log(answer);
