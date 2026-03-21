function solution(key, lock) {
    const n = lock.length;
    const m = key.length;
    
    const empty = [];
    for(let i = 0; i<n; i++){
        for(let j = 0; j<n; j++){
            if(lock[i][j] === 0) empty.push([i,j]);
        }
    }
    
    if (empty.length === 0) return true;
    
    let currentKey = key;
    
    // 2. key를 4방향으로 돌림
    for(let d = 0; d < 4; d++){
        currentKey = rotate(currentKey.map(row => [...row]));
        // 3. 시작점을 맞춰끼워보기
        for (let i = -(m - 1); i < n; i++) {
            for (let j = -(m - 1); j < n; j++) {
                
                if (check(i, j, currentKey, lock, empty, n, m)) return true;
            }
        }
    }
    
    return false;
}

function rotate(oldKey){
    const m = oldKey.length;
    const newKey = Array.from({length: m}, () => Array(m).fill(0));
    for(let i = 0; i < m; i++){
        for(let j = 0; j<m; j++){
            newKey[i][j] = oldKey[(m-1) - j][i];
        }
    }
    return newKey;
}

function check(dy, dx, key, lock, empty, n, m){
    let filledCount = 0;
    
    for(let i = 0; i<m; i++){
        for(let j = 0; j<m; j++){
            const nx = dx + j;
            const ny = dy + i;
            
            if(nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
            
            // 둘 다 돌기인 경우
            if(key[i][j] === 1 && lock[ny][nx] === 1) return false;
            
            if(key[i][j] === 1 && lock[ny][nx] === 0) filledCount++;
        }
    }
    return filledCount === empty.length
}