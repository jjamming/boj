//숨바꼭질 3 #13549
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const deque = [];
const MAX = 100000;
const visited = Array(MAX * 2).fill(false);

deque.push([N, 0]);
visited[N] = true;

while (deque.length > 0) {
  let [current, time] = deque.shift();

  if (current === K) {
    console.log(time);
    break;
  }

  for (let next of [current * 2, current - 1, current + 1]) {
    if (!visited[next] && next >= 0 && next <= MAX) {
      if (next === current * 2) {
        deque.unshift([next, time]);
      } else {
        deque.push([next, time + 1]);
      }
      visited[next] = true;
    }
  }
}
