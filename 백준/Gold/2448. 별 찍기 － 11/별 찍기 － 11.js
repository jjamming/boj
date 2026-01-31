// 별 찍기 - 11 #2448
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

// 한 줄 길이 : (N * 2) - 1
// 높이 : N
const arr = Array.from({ length: N }, () => Array(N * 2 - 1).fill(" "));

function draw(n, x, y) {
  if (n === 3) {
    // 1층: *
    arr[x][y] = "*";
    // 2층: * *
    arr[x + 1][y - 1] = "*";
    arr[x + 1][y + 1] = "*";
    // 3층: *****
    for (let i = -2; i <= 2; i++) arr[x + 2][y + i] = "*";
    return;
  }

  const next = n / 2;
  draw(next, x, y);
  draw(next, x + next, y - next);
  draw(next, x + next, y + next);
}

draw(N, 0, N - 1);

let answer = "";

arr.map((line) => {
  answer += line.join("") + "\n";
});

console.log(answer.slice(0, answer.length - 1));
