//패션왕 신해빈 #9375
const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const tc = Number(input[0]);

let line = 1;
let answer = "";

for (let t = 0; t < tc; t++) {
  const N = Number(input[line++]);
  const map = new Map();
  for (let i = 0; i < N; i++) {
    const [name, type] = input[line++].split(" ");
    if (!map.has(type)) {
      map.set(type, []);
    }
    map.get(type).push(name);
  }

  let cases = 1;

  map.forEach((arr, _) => {
    cases *= arr.length + 1;
  });

  cases -= 1;

  answer += cases + "\n";
}

console.log(answer.trim());
