function solution(triangle) {
    var answer = 0;
    const n = triangle.length
    
    for(let i = 1; i<n; i++){
        for(let j = 0; j<=i; j++){
            if(j === 0) triangle[i][j] += triangle[i-1][j];
            else if(j === i) triangle[i][j] += triangle[i-1][j-1];
            else triangle[i][j] += Math.max(triangle[i-1][j-1], triangle[i-1][j]);
        }
    }
    
    
    answer = Math.max(...triangle[n-1])
    return answer;
}