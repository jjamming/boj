function solution(progresses, speeds) {
    var answer = [];
    let n = progresses.length;
    
    const doneDay = Array(n).fill(0);
    
    for(let i = 0; i<n; i++){
        doneDay[i] = Math.ceil((100 - progresses[i]) / speeds[i])
    }
    
    let currentDay = doneDay[0];
    let count = 1;
    
    for(let i = 1; i<n; i++){
        if(doneDay[i] <= currentDay){
            count ++;
        } else{
            answer.push(count);
            count = 1;
            currentDay = doneDay[i];
        }
    }
    
    answer.push(count);
    return answer;
}