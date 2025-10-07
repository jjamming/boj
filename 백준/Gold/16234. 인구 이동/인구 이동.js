//인구 이동 #16234
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, L, R] = input[0].split(" ").map(Number);

const matrix = [];

let queue = new Array(N * N);
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

let day = 0;

while (true) {
  let moved = false;
  let visited = Array.from({ length: N }, () => new Array(N).fill(false));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;

      let { union, sum } = bfs(i, j, visited);

      if (union.length > 1) {
        moved = true;
        let avg = Math.floor(sum / union.length);
        for (const [ux, uy] of union) {
          matrix[ux][uy] = avg;
        }
      }
    }
  }
  if (!moved) break;
  day++;
}

console.log(day);

function bfs(sx, sy, visited) {
  let head = 0;
  let tail = 0;

  queue[tail++] = [sx, sy];
  visited[sx][sy] = true;

  const union = [[sx, sy]];
  let sum = matrix[sx][sy];

  while (head < tail) {
    const [cx, cy] = queue[head++];
    for (let dir = 0; dir < 4; dir++) {
      const [nx, ny] = [cx + dx[dir], cy + dy[dir]];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (visited[nx][ny]) continue;

      let diff = Math.abs(matrix[cx][cy] - matrix[nx][ny]);
      if (diff >= L && diff <= R) {
        visited[nx][ny] = true;
        queue[tail++] = [nx, ny];
        union.push([nx, ny]);
        sum += matrix[nx][ny];
      }
    }
  }
  return { union, sum };
}
