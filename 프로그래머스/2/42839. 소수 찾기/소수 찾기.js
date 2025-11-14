function solution(numbers) {
    var answer = 0;
    function isPrime(n){
        if(n <= 1) return false;
        if(n === 2) return true;
        if(n % 2 === 0) return false;
        
        const sqrt = Math.sqrt(n);
        for(let i = 3; i<= sqrt; i+=2){
            if(n % i === 0) return false;
        }
        return true;
    }
    
    const arr = numbers.split("");
    let result = [];
    function dfs(arr, len, used=[], result=[], cur=[]){
        if(cur.length === len){
            result.push(Number(cur.join("")))
            return
        }
        
        for(let i =0; i<arr.length; i++){
            if(used[i])continue;
            used[i] = true;
            cur.push(arr[i]);
            dfs(arr, len, used, result, cur);
            cur.pop();
            used[i] = false;
        }
        
        return result;
    }
    
    for(let i = 1; i<=arr.length; i++){
        let used = Array(arr.length).fill(false);
        dfs(arr, i, used, result, []);
    }
    
    result = [...new Set(result)]
    
    for(let num of result){
        if(isPrime(num)) answer++;
    }
    
    return answer;
}