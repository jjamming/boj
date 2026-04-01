const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let [cx, cy, cd] = input[1].split(" ").map(Number);

const matrix = [];

for (let i = 2; i < N + 2; i++) {
  const line = input[i].split(" ").map(Number);
  matrix.push(line);
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let count = 0;

while (true) {
  if (matrix[cx][cy] === 0) {
    matrix[cx][cy] = 2;
    count++;
  }

  let moved = false;

  for (let i = 0; i < 4; i++) {
    cd = (cd + 3) % 4;
    let [nx, ny] = [cx + dx[cd], cy + dy[cd]];
    if (matrix[nx][ny] === 0) {
      [cx, cy] = [nx, ny];
      moved = true;
      break;
    }
  }

  if (!moved) {
    let [bx, by] = [cx - dx[cd], cy - dy[cd]];
    if (matrix[bx][by] === 1) break;
    else [cx, cy] = [bx, by];
  }
}

console.log(count);
