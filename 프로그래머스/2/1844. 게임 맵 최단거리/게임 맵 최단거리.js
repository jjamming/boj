function solution(maps) {
    var answer = -1;
    const dx = [1,0,-1,0];
    const dy = [0,1,0,-1];
    const n = maps.length;
    const m = maps[0].length;
    
    const queue = [];
    let head = 0;
    let tail = 0;
    const visited = Array.from({length: n}, ()=> Array(m).fill(false))
    
    queue[tail++] = [0,0,1];
    
    while(head < tail){
        let [cx, cy, ctime] = queue[head++];
        if(cx === n-1 && cy === m-1) {
            answer = ctime;
            break;
        }
        for(let d = 0; d<4; d++){
            let [nx, ny] = [cx + dx[d], cy + dy[d]]
            if(nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
            if(maps[nx][ny] === 0 || visited[nx][ny]) continue;
            
            visited[nx][ny] = true;
            queue[tail++] = [nx,ny,ctime+1];
        }
    }
    
    return answer;
}