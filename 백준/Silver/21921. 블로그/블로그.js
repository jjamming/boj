//블로그 #21921
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, X] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let maxVisitors = 0;
let count = 1;

let start = 0;
let end = 0;

while (end < X) {
  maxVisitors += arr[end];
  end++;
}

let visitors = maxVisitors;

while (start < N - X) {
  visitors = visitors - arr[start] + arr[end];

  if (maxVisitors < visitors) {
    maxVisitors = visitors;
    count = 1;
  } else if (maxVisitors === visitors) {
    count++;
  }

  start++;
  end++;
}

if (maxVisitors === 0) {
  console.log("SAD");
} else {
  console.log(maxVisitors);
  console.log(count);
}
