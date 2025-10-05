//경사로 #14890
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, L] = input[0].split(" ").map(Number);

const matrix = [];
let answer = 0;

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function canPass(line, L) {
  const used = new Array(N).fill(false);
  for (let i = 1; i < N; i++) {
    const diff = line[i] - line[i - 1];
    if (diff === 0) continue;

    if (diff === 1) {
      const h = line[i - 1];
      if (i - L < 0) return false;
      for (let j = 1; j <= L; j++) {
        const idx = i - j;
        if (line[idx] !== h || used[idx]) return false;
      }
      for (let k = 1; k <= L; k++) {
        used[i - k] = true;
      }
    } else if (diff === -1) {
      const h = line[i];
      if (i + L - 1 >= N) return false;
      for (let j = 0; j < L; j++) {
        const idx = i + j;
        if (line[idx] !== h || used[idx]) return false;
      }
      for (let k = 0; k < L; k++) {
        used[i + k] = true;
      }
    } else {
      return false;
    }
  }
  return true;
}

for (let i = 0; i < N; i++) {
  if (canPass(matrix[i], L)) answer++;
}

for (let j = 0; j < N; j++) {
  const col = Array.from({ length: N }, (_, i) => matrix[i][j]);
  if (canPass(col, L)) answer++;
}

console.log(answer);
