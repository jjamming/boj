function solution(n, edge) {
    var answer = 0;
    let max = 0;
    const visited = Array(n+1).fill(false);
    const edges = Array.from({length: n+1}, () => []);
    
    for(let [node1, node2] of edge){
        edges[node1].push(node2);
        edges[node2].push(node1);
    }
    
    const queue = [];
    let head = 0;
    let tail = 0;
    
    
    queue[tail++] = [1, 0];
    visited[1] = true;
    
    while(head < tail){
        const [cur, dist] = queue[head++];
        
        if(dist > max){
            max = dist;
            answer = 1;
        } else if(dist === max){
            answer++;
        }
        
        for(let adj of edges[cur]){
            if(visited[adj]) continue;
            
            visited[adj] = true;
            queue[tail++] = [adj, dist+1];
        }
    }
    
    return answer;
}