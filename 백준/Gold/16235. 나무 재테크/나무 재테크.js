// 나무 재테크 #16235
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

const ground = Array.from({ length: N + 1 }, () => Array(N + 1).fill(5));
const tree = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => []),
);
const A = [[]];

for (let i = 1; i <= N; i++) {
  const line = input[i].split(" ").map(Number);
  A.push([0, ...line]);
}

for (let i = N + 1; i <= N + M; i++) {
  const [x, y, z] = input[i].split(" ").map(Number);
  tree[x][y].push(z);
}

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

for (let i = 0; i < K; i++) {
  springAndSummer();
  autumn();
  winter();
}

let count = 0;
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    count += tree[i][j].length;
  }
}
console.log(count);

function springAndSummer() {
  for (let x = 1; x <= N; x++) {
    for (let y = 1; y <= N; y++) {
      tree[x][y].sort((a, b) => a - b);

      if (tree[x][y].length === 0) continue;

      const alive = [];
      let dead = 0;

      for (const age of tree[x][y]) {
        if (ground[x][y] < age) {
          dead += Math.floor(age / 2);
        } else {
          alive.push(age + 1);
          ground[x][y] -= age;
        }
      }
      tree[x][y] = [...alive];
      ground[x][y] += dead;
    }
  }
}

function autumn() {
  for (let x = 1; x <= N; x++) {
    for (let y = 1; y <= N; y++) {
      if (tree[x][y].length === 0) continue;

      for (const age of tree[x][y]) {
        if (age % 5 === 0) {
          for (let d = 0; d < 8; d++) {
            const [nx, ny] = [x + dx[d], y + dy[d]];
            if (nx <= 0 || ny <= 0 || nx > N || ny > N) continue;
            tree[nx][ny].unshift(1);
          }
        }
      }
    }
  }
}

function winter() {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      ground[i][j] += A[i][j];
    }
  }
}
