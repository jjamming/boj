//미세먼지 안녕! #17144
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let [r, c, t] = input[0].split(" ").map(Number);

let matrix = [];
let airPurifier = [];

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (let i = 1; i <= r; i++) {
  const row = input[i].split(" ").map(Number);
  matrix.push(row);
  if (row[0] === -1) airPurifier.push(i - 1);
}

const [upper, lower] = [airPurifier[0], airPurifier[1]];

while (t--) {
  const prevMatrix = matrix.map((row) => [...row]);

  const nextMatrix = Array.from({ length: r }, () => Array(c).fill(0));
  nextMatrix[upper][0] = -1;
  nextMatrix[lower][0] = -1;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (prevMatrix[i][j] <= 0) continue;
      const amount = Math.floor(prevMatrix[i][j] / 5);
      let spreadCnt = 0;

      for (let dir = 0; dir < 4; dir++) {
        const [nx, ny] = [i + dx[dir], j + dy[dir]];
        if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
        if (prevMatrix[nx][ny] === -1) continue;
        nextMatrix[nx][ny] += amount;
        spreadCnt++;
      }
      nextMatrix[i][j] += prevMatrix[i][j] - amount * spreadCnt;
    }
  }

  for (let i = upper - 1; i > 0; i--) nextMatrix[i][0] = nextMatrix[i - 1][0];
  for (let j = 0; j < c; j++) nextMatrix[0][j] = nextMatrix[0][j + 1];
  for (let i = 0; i < upper; i++)
    nextMatrix[i][c - 1] = nextMatrix[i + 1][c - 1];
  for (let j = c - 1; j > 1; j--)
    nextMatrix[upper][j] = nextMatrix[upper][j - 1];
  nextMatrix[upper][1] = 0;
  nextMatrix[upper][0] = -1;

  for (let i = lower + 1; i < r - 1; i++)
    nextMatrix[i][0] = nextMatrix[i + 1][0];
  for (let j = 0; j < c - 1; j++)
    nextMatrix[r - 1][j] = nextMatrix[r - 1][j + 1];
  for (let i = r - 1; i > lower; i--)
    nextMatrix[i][c - 1] = nextMatrix[i - 1][c - 1];
  for (let j = c - 1; j > 0; j--)
    nextMatrix[lower][j] = nextMatrix[lower][j - 1];
  nextMatrix[lower][0] = -1;
  nextMatrix[lower][1] = 0;

  matrix = nextMatrix;
}
let sum = 0;
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (matrix[i][j] > 0) sum += matrix[i][j];
  }
}

console.log(sum);
