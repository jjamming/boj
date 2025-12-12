//적록색약 #10026
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const matrix = [];
let visited = Array.from({ length: N }, () => Array(N).fill(false));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(""));
}

let RGBcount = 0;
let RBcount = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    RGBdfs(i, j, matrix[i][j]);
    RGBcount++;
  }
}

visited = Array.from({ length: N }, () => Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    RBdfs(i, j, matrix[i][j]);
    RBcount++;
  }
}

console.log(RGBcount + " " + RBcount);

function RGBdfs(x, y, color) {
  visited[x][y] = true;
  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [x + dx[d], y + dy[d]];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (visited[nx][ny]) continue;
    if (matrix[nx][ny] !== color) continue;

    RGBdfs(nx, ny, matrix[nx][ny]);
  }
}

function RBdfs(x, y, color) {
  visited[x][y] = true;
  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [x + dx[d], y + dy[d]];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (visited[nx][ny]) continue;
    if (color === "R" || color === "G") {
      if (matrix[nx][ny] === "B") continue;
    } else {
      if (matrix[nx][ny] !== color) continue;
    }

    RBdfs(nx, ny, matrix[nx][ny]);
  }
}
