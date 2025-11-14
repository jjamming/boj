function solution(numbers, target) {
    var answer = 0;
    const selected = [];
    const n = numbers.length;
    
    dfs(0);
    
    function dfs(depth){
        if(depth === n){
            let sum = 0;
            for(let i = 0; i<n; i++){
                if(selected[i] === "-") sum -= numbers[i];
                else sum += numbers[i];
            }
            if(sum === target) answer++;
            return;
        }
        
        for(let sign of ["+", "-"]){
            selected.push(sign);
            dfs(depth + 1);
            selected.pop();
        }
    }
    return answer;
}