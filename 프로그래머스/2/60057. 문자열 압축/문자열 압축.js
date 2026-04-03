function solution(s) {
    let answer = s.length; // 압축 안됨
    
    // idea: 제일 앞에부터 s.length / 2 번째까지 묶어보자
    // 묶는 로직: 함수로 만들어보자
    for(let i = 1; i<= s.length / 2; i++){
        const encodedLen = encoding(s, i);
        answer = Math.min(answer, encodedLen);
    }
    
    return answer;
}

function encoding(str, unit){
    // 단어를 유닛별로 돌면서, 반복되는 개수 세고 묶기
    // 묶으면 다음 인덱스부터 유닛별로 묶기
    let idx = 0;
    let encoded = ""
    while(idx < str.length){
        let chunk = str.slice(idx, idx + unit);
        let count = 1;
        
        while(idx + unit * count < str.length && str.slice(idx + unit * count, idx + unit * (count + 1)) === chunk) {
            count++;
        }
        
        encoded += (count > 1 ? count : "") + chunk;
        idx += unit * count;
    }
    
    return encoded.length;
}