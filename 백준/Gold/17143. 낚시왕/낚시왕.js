// 낚시왕 #17143
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [R, C, M] = input[0].split(" ").map(Number);

const sharks = [];

for (let i = 1; i <= M; i++) {
  sharks.push(input[i].split(" ").map(Number)); // [x, y, 속력, 크기, 방향]
}

const directions = [[], [-1, 0], [1, 0], [0, 1], [0, -1]]; // 1-based 상, 하, 우, 좌

const hasShark = Array.from({ length: R + 1 }, () => Array(C + 1).fill(false));
const pool = Array.from({ length: R + 1 }, () => Array(C + 1).fill(0));

for (let shark of sharks) {
  let [x, y, s, d, z] = shark;
  hasShark[x][y] = true;
  pool[x][y] = [s, d, z];
}

let fisher = 0;
let amount = 0;
while (fisher <= C) {
  fisher++;

  // 낚시꾼이 있는 열에서 가장 가까운 상어 잡음
  for (let r = 1; r <= R; r++) {
    if (hasShark[r][fisher]) {
      amount += pool[r][fisher][2];
      pool[r][fisher] = 0;
      hasShark[r][fisher] = false;
      break;
    }
  }

  // 상어들이 이동한다.
  const prev = pool.map((row) => [...row]);

  const nextPool = Array.from({ length: R + 1 }, () => Array(C + 1).fill(0));
  const nextHasShark = Array.from({ length: R + 1 }, () =>
    Array(C + 1).fill(false)
  );

  for (let x = 1; x <= R; x++) {
    for (let y = 1; y <= C; y++) {
      if (!hasShark[x][y]) continue;
      const [s, d, z] = prev[x][y];

      const { nx, ny, nd } = move(x, y, s, d);

      if (nextPool[nx][ny] === 0 || nextPool[nx][ny][2] < z) {
        nextPool[nx][ny] = [s, nd, z];
        nextHasShark[nx][ny] = true;
      }
    }
  }

  for (let i = 1; i <= R; i++) {
    for (let j = 1; j <= C; j++) {
      pool[i][j] = nextPool[i][j];
      hasShark[i][j] = nextHasShark[i][j];
    }
  }
}

console.log(amount);

function move(x, y, s, d) {
  let nd = d;
  let cx = x;
  let cy = y;

  if (nd === 1 || nd === 2) {
    const cycle = (R - 1) * 2 || 1;
    let k = s % cycle;
    while (k--) {
      let nx = cx + directions[nd][0];
      if (nx <= 0 || nx > R) {
        nd = nd === 1 ? 2 : 1;
        nx = cx + directions[nd][0];
      }
      cx = nx;
    }
  } else {
    const cycle = (C - 1) * 2 || 1;
    let k = s % cycle;
    while (k--) {
      let ny = cy + directions[nd][1];
      if (ny <= 0 || ny > C) {
        nd = nd === 3 ? 4 : 3;
        ny = cy + directions[nd][1];
      }
      cy = ny;
    }
  }
  return { nx: cx, ny: cy, nd };
}
