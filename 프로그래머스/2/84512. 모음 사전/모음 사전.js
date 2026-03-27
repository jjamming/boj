function solution(word) {
    let answer = 0;
    let count = 0;
    const arr = ["A","E","I","O","U"];
    
    function dfs(currentWord){
        if(word === currentWord){
            answer = count;
            return;
        }
        
        if(currentWord.length === 5) return;
        
        for(let i = 0; i< 5; i++){
            if(answer > 0) return;
            
            count++;
            dfs(currentWord + arr[i]);
        }
    }
    dfs("");
    return answer;
}