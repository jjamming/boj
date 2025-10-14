function solution(maps) {
    var answer = [];
    const map = [];
    const dx = [1,0,-1,0];
    const dy = [0,1,0,-1];
    
    for(let i = 0 ; i<maps.length; i++){
        let line = maps[i].split("");
        map.push(line);
    }
    const n = map.length; // row
    const m = map[0].length; // column
    
    let visited = Array.from({length: n}, ()=>Array(m).fill(false))
    let foodArr = []

    for(let i = 0 ; i<n; i++){
        for(let j = 0 ; j<m; j++){
            if(map[i][j] === "X") continue;
            if(visited[i][j]) continue;
            let queue = [[i,j]];
            visited[i][j] = true;
            let sum = 0;
            while(queue.length){
                let [cx,cy] = queue.shift();
                sum += Number(map[cx][cy]);
                
                for(let dir = 0; dir<4; dir++){
                    let [nx,ny] = [cx + dx[dir], cy + dy[dir]];
                    if(nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
                    if(visited[nx][ny] || map[nx][ny] === "X") continue;
                    queue.push([nx,ny]);
                    visited[nx][ny] = true;
                }
            }
            foodArr.push(sum);
        }
    }
    if(foodArr.length > 0){
        answer = foodArr.sort((a,b)=> a-b);
    } else answer.push(-1);
    
    return answer;
}