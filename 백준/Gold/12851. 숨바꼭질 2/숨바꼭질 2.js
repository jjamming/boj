//숨바꼭질2 #12851
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [start, end] = input[0].split(" ").map(Number);

const queue = [];
const visited = Array(100001).fill(-1);

let head = 0;
let tail = 0;

queue[tail++] = [start, 0];
visited[start] = 1;

let found = false;
let count = 0;
let minTime = Number.MAX_SAFE_INTEGER;

while (head < tail) {
  const [cur, time] = queue[head++];

  if (cur === end) {
    if (!found) {
      minTime = time;
      found = true;
      count = 1;
    } else {
      count++;
    }

    continue;
  }

  for (let nx of [cur - 1, cur + 1, cur * 2]) {
    if (nx < 0 || nx > 100001) continue;
    if (visited[nx] === -1 || visited[nx] === time + 1) {
      visited[nx] = time + 1;
      queue[tail++] = [nx, time + 1];
    }
  }
}

console.log(minTime + "\n" + count);
