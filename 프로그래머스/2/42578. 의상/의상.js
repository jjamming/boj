function solution(clothes) {
    let answer = 1;
    const map = new Map();
    for(const [name, type] of clothes){
        map.set(type, (map.get(type) || 1) + 1);
    }
    
    for(const [type, count] of [...map]){
        answer = answer * count;
    }
    
    return answer - 1;
}