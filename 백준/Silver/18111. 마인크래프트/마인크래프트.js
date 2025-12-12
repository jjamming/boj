//마인크래프트 #18111
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M, B] = input[0].split(" ").map(Number);

const land = [];
for (let i = 1; i <= N; i++) {
  land.push(input[i].split(" ").map(Number));
}

const map = new Map();
let minH = 256;
let maxH = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const h = land[i][j];
    map.set(h, (map.get(h) || 0) + 1);
    minH = Math.min(minH, h);
    maxH = Math.max(maxH, h);
  }
}

let answerTime = Infinity;
let answerHeight = 0;

for (let h = 0; h <= 256; h++) {
  let remove = 0;
  let add = 0;

  for (const [height, count] of map) {
    if (height > h) {
      remove += (height - h) * count;
    } else if (height < h) {
      add += (h - height) * count;
    }
  }

  if (remove + B < add) continue;

  const time = remove * 2 + add;

  if (time < answerTime) {
    answerTime = time;
    answerHeight = h;
  } else if (time === answerTime) {
    answerHeight = Math.max(answerHeight, h);
  }
}

console.log(answerTime, answerHeight);
