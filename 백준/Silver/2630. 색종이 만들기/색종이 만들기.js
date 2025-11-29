// 색종이 만들기 #2630
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

const matrix = [];
let blueSquare = 0;
let whiteSquare = 0;

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function isSquare(x, y, size) {
  const color = matrix[x][y];

  for (let i = x; i < size + x; i++) {
    for (let j = y; j < size + y; j++) {
      if (matrix[i][j] !== color) return false;
    }
  }
  return true;
}

function divide(x, y, size) {
  if (isSquare(x, y, size)) {
    const color = matrix[x][y];
    if (color === 1) blueSquare++;
    else whiteSquare++;
    return;
  }

  const half = Math.ceil(size / 2);
  divide(x, y, half);
  divide(x + half, y, half);
  divide(x, y + half, half);
  divide(x + half, y + half, half);
}

divide(0, 0, N);

console.log(whiteSquare);
console.log(blueSquare);
