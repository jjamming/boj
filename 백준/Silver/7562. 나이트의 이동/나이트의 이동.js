//나이트의 이동 #7562
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const testCase = Number(input[0]);

let line = 1;

const move = [
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [-2, 1],
  [-1, 2],
  [2, 1],
  [1, 2],
];

for (let tc = 1; tc <= testCase; tc++) {
  let l = Number(input[line++]);
  let [sx, sy] = input[line++].split(" ").map(Number);
  let [fx, fy] = input[line++].split(" ").map(Number);
  let board = Array.from({ length: l }, () => new Array(l).fill(false));
  let head = 0;
  let tail = 0;
  let queue = [];

  queue[tail++] = [sx, sy, 0];
  while (queue.length) {
    let [cx, cy, time] = queue[head++];
    if (cx === fx && cy === fy) {
      console.log(time);
      break;
    }
    for (let dir = 0; dir < 8; dir++) {
      let [nx, ny] = [cx + move[dir][0], cy + move[dir][1]];
      if (nx < 0 || ny < 0 || nx >= l || ny >= l) continue;
      if (board[nx][ny]) continue;
      board[nx][ny] = true;
      queue[tail++] = [nx, ny, time + 1];
    }
  }
}
