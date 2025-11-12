function solution(answers) {
    var answer = [];
    const check = [
        [1,2,3,4,5],
        [2,1,2,3,2,4,2,5],
        [3,3,1,1,2,2,4,4,5,5]
    ]
    const n = answers.length
    const score = Array(3).fill(0);
    
    for(let i = 0; i<n; i++){
        let answer = answers[i];
        if(answer === check[0][i % 5] ) score[0]++;
        if(answer === check[1][i % 8]) score[1]++;
        if(answer ===  check[2][i % 10]) score[2]++
    }
    let max = Math.max(...score);
    
    for(let i = 0; i<3; i++){
        if(score[i] === max){
            answer.push(i+1)
        }
    }
    
    return answer;
}