//상어 초등학교 #21608
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const count = n * n; // 총 학생 수

const classroom = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)); // 교실
const favorite = Array.from({ length: count + 1 }, () => new Set()); // 각 학생이 좋아하는 학생들 배열
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let score = 0;

for (let i = 1; i <= count; i++) {
  let [num, ...likes] = input[i].split(" ").map(Number);
  likes.map((s) => {
    favorite[num].add(s);
  });
}

// idea: 순서대로 학생 별 앉을 후보 자리 배열을 두고 우선순위가 가장 높은 곳에 배치
for (let s = 1; s <= count; s++) {
  let student = input[s].split(" ").map(Number)[0];
  let cand = [];
  for (let x = 1; x <= n; x++) {
    for (let y = 1; y <= n; y++) {
      let favCount = 0;
      let emptyCount = 0;
      if (classroom[x][y] !== 0) continue; // 빈자리가 아님
      for (let d = 0; d < 4; d++) {
        let [nx, ny] = [x + dx[d], y + dy[d]];
        if (nx <= 0 || ny <= 0 || nx > n || ny > n) continue;
        if (classroom[nx][ny] === 0) {
          emptyCount++;
        }
        if (favorite[student].has(classroom[nx][ny])) {
          favCount++;
        }
      }
      cand.push([x, y, favCount, emptyCount]);
    }
  }

  cand.sort((a, b) => {
    let [ax, ay, aFav, aEmpty] = a;
    let [bx, by, bFav, bEmpty] = b;
    if (aFav !== bFav) return bFav - aFav;
    if (aEmpty !== bEmpty) return bEmpty - aEmpty;
    if (ax !== bx) return ax - bx;
    else ay - by;
  });

  classroom[cand[0][0]][cand[0][1]] = student;
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    const student = classroom[i][j];
    let count = 0;
    for (let d = 0; d < 4; d++) {
      let [nx, ny] = [i + dx[d], j + dy[d]];
      if (nx <= 0 || ny <= 0 || nx > n || ny > n) continue;
      if (favorite[student].has(classroom[nx][ny])) count++;
    }
    switch (count) {
      case 1:
        score += 1;
        break;
      case 2:
        score += 10;
        break;
      case 3:
        score += 100;
        break;
      case 4:
        score += 1000;
        break;
      default:
        break;
    }
  }
}

console.log(score);
