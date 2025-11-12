//마법사 상어와 비바라기 #21610
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const matrix = [[]];

for (let i = 1; i <= n; i++) {
  let line = input[i].split(" ").map(Number);
  matrix.push([0, ...line]);
}

const move = [
  [],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

const diagonal = [
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, -1],
];

let cloud = [
  [n - 1, 1],
  [n - 1, 2],
  [n, 1],
  [n, 2],
];

for (let i = n + 1; i < n + m + 1; i++) {
  const [d, s] = input[i].split(" ").map(Number);
  const beforeCloud = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(false)
  );
  // 구름 이동 로직
  for (let j = 0; j < cloud.length; j++) {
    let [x, y] = cloud[j];
    const nx = ((x - 1 + move[d][0] * (s % n) + n) % n) + 1;
    const ny = ((y - 1 + move[d][1] * (s % n) + n) % n) + 1;
    cloud[j] = [nx, ny];
  }

  // 비 내리기
  const targets = [];
  while (cloud.length > 0) {
    let [x, y] = cloud.shift();
    if (!beforeCloud[x][y]) {
      beforeCloud[x][y] = true;
      targets.push([x, y]);
    }
  }

  for (let [x, y] of targets) {
    matrix[x][y]++;
  }

  // 비 내린 곳에 대해 물 복사 버그 로직
  for (let [x, y] of targets) {
    for (let [dx, dy] of diagonal) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx > 0 && ny > 0 && nx <= n && ny <= n && matrix[nx][ny] > 0)
        matrix[x][y]++;
    }
  }

  cloud = [];
  for (let k = 1; k <= n; k++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[k][j] >= 2 && !beforeCloud[k][j]) {
        cloud.push([k, j]);
        matrix[k][j] -= 2;
      }
    }
  }
}

let sum = 0;
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    sum += matrix[i][j];
  }
}

console.log(sum);
