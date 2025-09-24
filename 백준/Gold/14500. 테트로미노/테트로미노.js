// 테트로미노 #14500, 삼성문제집
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const matrix = [];

for (let i = 1; i <= n; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

let maxSum = 0;
const visited = Array.from({ length: n }, () => Array(m).fill(false));

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function dfs(x, y, depth, sum) {
  if (x < 0 || y < 0 || x >= n || y >= m) return;
  if (visited[x][y]) return;

  sum += matrix[x][y];

  if (depth === 4) {
    if (sum > maxSum) maxSum = sum;
    return;
  }

  visited[x][y] = true;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];
    dfs(nx, ny, depth + 1, sum);
  }

  visited[x][y] = false;
}

function checkT(x, y) {
  // x,y가 중간에 있는 모든 ㅗ 경우의 합을 브루트 포스로 구함
  let sum = matrix[x][y];
  let neighbors = [];

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];
    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
    neighbors.push(matrix[nx][ny]);
  }

  if (neighbors.length < 3) return;

  for (let i = 0; i < neighbors.length; i++) {
    sum += neighbors[i];
  }

  if (neighbors.length === 4) {
    // + 모양이라면 팔 중 제일 작은 수 제외하고 합 구하기
    sum -= Math.min(...neighbors);
  }

  if (sum > maxSum) maxSum = sum;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    dfs(i, j, 1, 0);
    checkT(i, j);
  }
}

console.log(maxSum);
