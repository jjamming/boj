//곱셈 #1629
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [a, b, c] = input[0].split(" ").map(BigInt);

/**
 * 모듈러 연산의 성질
 * (a * b) % c === ((a % c) * (b%c)) % c;
 *
 * 지수 법칙
 * a^b === a^(b/2) * a^(b/2)
 *
 * (a ^ b) % c === (((a^(b/2)) % c) * ((a^(b/2)) % c)) % c
 * (a ^ b) % c === (((a^(b/2)) % c) * ((a^(b/2)) % c) * (a % c)) % c
 */

function solution(exponent) {
  if (exponent === 1n) {
    return a % c;
  }

  let half = solution(exponent / 2n) % c;

  if (exponent % 2n === 1n) {
    // 지수가 홀수라면 a 한 번 더 곱해줌
    return (half * half * (a % c)) % c;
  } else {
    return (half * half) % c;
  }
}

let answer = solution(b).toString();
console.log(answer);
