// 체스판 다시 칠하기 #1018
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [m, n] = input[0].split(" ").map(Number);

const board = [];
let minCount = Number.MAX_SAFE_INTEGER;

for (let i = 1; i <= m; i++) {
  board.push(input[i].split(""));
}

for (let i = 0; i <= m - 8; i++) {
  for (let j = 0; j <= n - 8; j++) {
    let startW = 0;
    let startB = 0;

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let cur = board[i + x][j + y];
        let isEven = (x + y) % 2 === 0;

        // W로 시작 -> [x][y] 의 합이 짝수인 칸은 W여야함 ([0,0], [0,2], [1,1])
        if (isEven) {
          if (cur !== "W") startW++;
        } else {
          if (cur !== "B") startW++;
        }

        // B로 시작 => 합이 짝수인 칸은 B 여야함
        if (isEven) {
          if (cur !== "B") startB++;
        } else {
          if (cur !== "W") startB++;
        }
      }
    }

    minCount = Math.min(minCount, startB, startW);
  }
}

console.log(minCount);
