function solution(n, computers) {
    var answer = 0;
    let selected = [];
    let visited = Array(n).fill(false);
    for(let i = 0; i<n; i++){
        if(!visited[i]){
            visited[i] = true;
            dfs(i);
            answer++;
        }
    }
    
    function dfs(node){
        for(let i = 0; i<n; i++){
            if(visited[i]) continue;
            if(computers[node][i] === 0) continue;
            visited[i] = true;
            dfs(i);
        }
    }
    
    return answer;
}