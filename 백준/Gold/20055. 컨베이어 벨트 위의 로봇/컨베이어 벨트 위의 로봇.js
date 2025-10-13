//컨베이어 벨트 위의 로봇 #20055
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const line = input[1].split(" ").map(Number);

const conveyor = [...line]; // 0-based
const hasRobot = new Array(N * 2).fill(false);

let start = 0;
let end = N - 1;

let step = 0;
let zeroCount = conveyor.reduce((acc, v) => acc + (v === 0 ? 1 : 0), 0);

function mod(a, b) {
  return ((a % b) + b) % b;
}

outer: while (true) {
  step++;
  // 컨베이어 벨트 회전
  start = mod(start - 1, N * 2);
  end = mod(end - 1, N * 2);

  // end 위치 로봇 내림
  hasRobot[end] = false;

  // 가장 최근에 올라간 로봇(제일 end에 가까운 로봇)부터 한 칸씩 이동
  let upper = N - 1;
  let idx = mod(end - 1, N * 2);
  while (upper > 0) {
    if (
      hasRobot[idx] && // 제일 최근 칸에 로봇이 있고
      conveyor[(idx + 1) % (N * 2)] > 0 && // 내구도가 1 이상이며
      !hasRobot[(idx + 1) % (N * 2)] // 다음 칸에 로봇이 없으면
    ) {
      if ((idx + 1) % (N * 2) !== end) hasRobot[(idx + 1) % (N * 2)] = true; // 다음 칸에 로봇을 두고
      hasRobot[idx] = false; // 현재 칸에는 로봇을 없애고
      conveyor[(idx + 1) % (N * 2)]--; // 다음 칸 내구도를 감소
      if (conveyor[(idx + 1) % (N * 2)] === 0) zeroCount++;
      if (zeroCount === K) break outer;
    }

    idx = mod(idx - 1, N * 2);
    upper--;
  }

  // start위치에 로봇 올림
  if (conveyor[start] > 0) {
    hasRobot[start] = true;
    conveyor[start]--;
    if (conveyor[start] === 0) zeroCount++;
    if (zeroCount === K) break outer;
  }
}

console.log(step);
