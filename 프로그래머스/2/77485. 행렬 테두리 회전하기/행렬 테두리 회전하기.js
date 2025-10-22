function solution(rows, columns, queries) {
    var answer = [];
    let matrix = Array.from({length: rows+1}, ()=>Array(columns+1).fill(0));
    let num = 1;
    for(let i = 1; i<=rows; i++){
        for(let j = 1; j<=columns; j++){
            matrix[i][j] = num++;
        }
    }
    for(let query of queries){
        let [x1, y1, x2, y2] = query;
        let prev = [...matrix].map((r)=>[...r]);
        let min = num+1;
        // ->->
        for(let j = y1; j<y2; j++){
            matrix[x1][j+1] = prev[x1][j];
            min = Math.min(min, prev[x1][j]);
        }
        // VV
        for(let i = x1; i < x2; i++){
            matrix[i+1][y2] = prev[i][y2];
            min = Math.min(min, prev[i][y2]);
        }
        // <-<-
        for(let j = y2; j > y1; j--){
            matrix[x2][j-1] = prev[x2][j];
            min = Math.min(min, prev[x2][j]);
        }
        // ^^
        for(let i = x2; i >x1; i--){
            matrix[i-1][y1] = prev[i][y1];
            min = Math.min(min, prev[i][y1]);
        }
        answer.push(min);
    }
    
    return answer;
}