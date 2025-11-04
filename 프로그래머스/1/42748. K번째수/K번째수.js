function solution(array, commands) {
    var answer = [];
    
    for(let [i,j,k] of commands){
        let cutArr = array.slice(i-1,j);
        
        cutArr.sort((a,b)=> a-b);
        answer.push(cutArr[k-1])
    }
    
    return answer;
}