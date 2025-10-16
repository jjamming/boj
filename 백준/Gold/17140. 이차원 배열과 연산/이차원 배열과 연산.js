//이차원 배열과 연산 #17140
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [r, c, k] = input[0].split(" ").map(Number);

const arr = [];

for (let i = 1; i <= 3; i++) {
  arr.push(input[i].split(" ").map(Number));
}

let time = 0;
let rowLen = arr.length;
let colLen = arr[0].length;

while (true) {
  if (arr[r - 1] && arr[r - 1][c - 1] === k) break;
  time++;
  if (time > 100) {
    time = -1;
    break;
  }

  function countSort(line) {
    const map = new Map();
    for (let v of line) {
      if (v === 0) continue;
      map.set(v, (map.get(v) || 0) + 1);
    }
    let sorted = [...map]
      .sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        else return a[1] - b[1];
      })
      .flat();
    if (sorted.length > 100) {
      sorted.length = 100;
    }
    return sorted;
  }

  if (rowLen >= colLen) {
    // 행 정렬

    let maxLen = 0;

    for (let i = 0; i < rowLen; i++) {
      const sorted = countSort(arr[i]);
      arr[i] = [...sorted];
      if (sorted.length > maxLen) maxLen = sorted.length;
    }

    for (let i = 0; i < rowLen; i++) {
      const need = maxLen - arr[i].length;
      if (need > 0) arr[i].push(...Array(need).fill(0));
    }

    colLen = maxLen;
  } else {
    // 열 정렬
    const cols = [];
    let maxLen = 0;

    for (let j = 0; j < colLen; j++) {
      const col = [];
      for (let i = 0; i < rowLen; i++) col.push(arr[i]?.[j] ?? 0);
      const sorted = countSort(col);
      cols.push(sorted);
      if (sorted.length > maxLen) maxLen = sorted.length;
    }

    const newArr = Array.from({ length: Math.max(1, maxLen) }, () =>
      Array(colLen).fill(0)
    );
    for (let j = 0; j < colLen; j++) {
      const col = cols[j];
      for (let i = 0; i < col.length; i++) newArr[i][j] = col[i];
    }

    arr.length = newArr.length;
    for (let i = 0; i < newArr.length; i++) arr[i] = newArr[i];
    rowLen = newArr.length;
  }
}

console.log(time);
