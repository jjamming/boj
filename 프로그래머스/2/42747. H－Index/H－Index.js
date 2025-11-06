function solution(citations) {
    var answer = 0;
    const n = citations.length;
    citations.sort((a,b)=>a-b);
    for(let i = 0; i<n; i++){
        const h = n - i
        if(citations[i] >= h){
            answer = h;
            break;
        }
    }
    return answer;
}