//톱니바퀴 #14891
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const gear = [[]];

for (let i = 0; i < 4; i++) {
  gear.push(input[i].split("").map(Number));
}

const count = Number(input[4]);
let answer = 0;
const direction = [[], [6, 2], [6, 2], [6, 2], [6, 2]];
let line = 5;

for (let i = 0; i < count; i++) {
  let [gearNum, dir] = input[line++].split(" ").map(Number);
  let isRotated = new Array(5).fill(false);

  rotate(gearNum, dir, isRotated);
}

let score = 1;
for (let i = 1; i <= 4; i++) {
  let idxOf12 = (direction[i][0] + 2) % 8;

  if (gear[i][idxOf12] === 1) {
    answer += score;
  }

  score *= 2;
}
function rotate(gearNum, dir, isRotated) {
  let leftIdx = direction[gearNum][0];
  let rightIdx = direction[gearNum][1];
  isRotated[gearNum] = true;

  if (dir === -1) {
    // 반시계 방향 회전
    direction[gearNum] = [(leftIdx + 1) % 8, (rightIdx + 1) % 8];
  } else {
    // 시계 방향 회전
    direction[gearNum] = [(leftIdx - 1 + 8) % 8, (rightIdx - 1 + 8) % 8];
  }
  let leftGearNum = gearNum - 1;
  let rightGearNum = gearNum + 1;
  if (
    leftGearNum > 0 &&
    !isRotated[leftGearNum] &&
    gear[leftGearNum][direction[leftGearNum][1]] !== gear[gearNum][leftIdx]
  ) {
    rotate(leftGearNum, -dir, isRotated);
  }
  if (
    rightGearNum < 5 &&
    !isRotated[rightGearNum] &&
    gear[rightGearNum][direction[rightGearNum][0]] !== gear[gearNum][rightIdx]
  ) {
    rotate(rightGearNum, -dir, isRotated);
  }
}

console.log(answer);
