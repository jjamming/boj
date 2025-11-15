function solution(k, dungeons) {
    var answer = -1;
    const n = dungeons.length;
    
    const visited = Array(n).fill(false);
    dfs(k, 0)
    
    function dfs(hp, count){
        answer = Math.max(count, answer);
        
        for(let i = 0; i<n; i++){
            if(visited[i]) continue;
            
            const [min, cost] = dungeons[i];
            
            if(hp < min) continue
            
            visited[i] = true;
            dfs(hp-cost, count+1);
            visited[i] = false;
        }
    }
    
    return answer;
}