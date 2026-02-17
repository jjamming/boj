function solution(n, wires) {
    let answer = n;
    
    wires.forEach((_, exclude)=>{
        const edge = Array.from({length: n+1}, () => []);
        wires.forEach(([v1, v2], index) => {
            if(index !== exclude){
            edge[v1].push(v2);
            edge[v2].push(v1);
            }
        })
        const visited = Array(n+1).fill(false);
        const nodeCount = [];
        for(let i = 1; i<=n; i++){
            if(visited[i]) continue;
            let count = 0;
            function dfs(idx){
                visited[idx] = true;
                count++;
                for(const adj of edge[idx]){
                    if(visited[adj]) continue;
                    visited[adj] = true;
                    dfs(adj);
                }
            }
            dfs(i);
            nodeCount.push(count);
        }
        answer = Math.min(answer, Math.abs(nodeCount[0] - nodeCount[1]))
    })
    
    return answer;
}