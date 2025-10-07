//지름길 #1446
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, D] = input[0].split(" ").map(Number);
const shortcut = [];
const dp = new Array(D + 1).fill(0);

for (let i = 1; i <= N; i++) {
  shortcut.push(input[i].split(" ").map(Number));
}

shortcut.sort((a, b) => {
  if (a[1] !== b[1]) {
    // end가 다르다면 end 오름차순
    return a[1] - b[1];
  } else {
    // 같다면 distance 오름차순
    return a[2] - b[2];
  }
});

for (let i = 1; i <= D; i++) {
  dp[i] = dp[i - 1] + 1;
  for (let j = 0; j < N; j++) {
    let [start, end, distance] = shortcut[j];
    if (end === i) {
      dp[i] = Math.min(dp[i], dp[start] + distance);
    }
  }
}

console.log(dp[D]);
