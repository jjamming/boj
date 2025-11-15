function solution(k, dungeons) {
    var answer = -1;
    const n = dungeons.length;
    const selected = []
    const visited = Array(n).fill(false);
    dfs(0)
    
    function dfs(depth){
        if(depth === n){
            let count = explore(selected);
            answer = Math.max(count, answer);
            return;
        }
        for(let i = 0; i<n; i++){
            if(visited[i]) continue;
            selected.push(i);
            visited[i] = true;
            dfs(depth + 1);
            visited[i] = false;
            selected.pop();
        }
    }
    
    function explore(arr){
        let hp = k;
        let count = 0;
        for(let i = 0; i<n; i++){
            let dungeon = arr[i];
            let [min, damage] = dungeons[dungeon];
            if(hp < min) break;
            else {
                hp -= damage;
                count++;
            }
        }
        return count;
    }
    
    return answer;
}