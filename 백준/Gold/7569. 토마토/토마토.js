//토마토 #7569
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [M, N, H] = input[0].split(" ").map(Number);

const tomato = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);

const visited = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(false))
);

let unripe = 0;
const queue = [];
let head = 0;
let tail = 0;

let line = 1;
for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    let row = input[line++].split(" ").map(Number);
    for (let m = 0; m < M; m++) {
      tomato[h][n][m] = row[m];
      if (tomato[h][n][m] === 0) unripe++;
      if (tomato[h][n][m] === 1) {
        queue[tail++] = [h, n, m, 0];
        visited[h][n][m] = true;
      }
      if (tomato[h][n][m] === -1) visited[h][n][m] = true;
    }
  }
}

if (unripe === 0) {
  console.log(0);
  process.exit(0);
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let maxDay = 0;

while (head < tail) {
  const [ch, cx, cy, ctime] = queue[head++];

  if (ch + 1 < H && tomato[ch + 1][cx][cy] === 0 && !visited[ch + 1][cx][cy]) {
    visited[ch + 1][cx][cy] = true;
    tomato[ch + 1][cx][cy] = 1;
    unripe--;
    queue[tail++] = [ch + 1, cx, cy, ctime + 1];
    if (ctime + 1 > maxDay) maxDay = ctime + 1;
  }

  if (ch - 1 >= 0 && tomato[ch - 1][cx][cy] === 0 && !visited[ch - 1][cx][cy]) {
    visited[ch - 1][cx][cy] = true;
    tomato[ch - 1][cx][cy] = 1;
    unripe--;
    queue[tail++] = [ch - 1, cx, cy, ctime + 1];
    if (ctime + 1 > maxDay) maxDay = ctime + 1;
  }

  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [cx + dx[d], cy + dy[d]];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (visited[ch][nx][ny]) continue;
    if (tomato[ch][nx][ny] === 0) {
      visited[ch][nx][ny] = true;
      tomato[ch][nx][ny] = 1;
      unripe--;
      queue[tail++] = [ch, nx, ny, ctime + 1];
      if (ctime + 1 > maxDay) maxDay = ctime + 1;
    }
  }
}

if (unripe > 0) {
  console.log(-1);
} else {
  console.log(maxDay);
}
