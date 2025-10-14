function solution(nums) {
    var answer = 0;
    
    const arr = [...nums];
    const selected = [];
    
    function dfs(idx, depth){
        if(depth === 3){
            let sum = 0;
            for(let i = 0; i<3; i++){
                sum += selected[i];
            }
            if(isPrime(sum)) answer++;
            return;
        }
        for(let i = idx; i < arr.length; i++){
            selected.push(arr[i]);
            dfs(i + 1, depth + 1);
            selected.pop();
        }
    }
    
    dfs(0,0);
    
    function isPrime(n){
    if(n<2) return false;
    for(let i = 2; i<=Math.sqrt(n); i++){
        if(n % i === 0) return false;
    }
    return true;
    }
    
    return answer;
}

