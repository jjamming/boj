function solution(n, words) {
    var answer = [];
    let turn = 0;
    let loser = 0;
    let wordSet = new Set();
    let line = 0;
    let last = ""
    outer: while(line < words.length){
        // 1. 턴 시작
        turn ++;
        // 2. n명의 사람이 각자 말을 한다.
        for(let i = 0;i < n; i++){
            let word = words[line++];
            console.log(word, line, i, turn)
            if(turn === 1 && i === 0){ // 제일 첫 단어는 그냥 넣음
                wordSet.add(word);
                last = word.at(-1);
                continue;
            }
            if(word[0] !== last || wordSet.has(word)){
                loser = i + 1;
                break outer;
            } else{
                wordSet.add(word);
                last = word.at(-1);
                continue;
            }
            
        }
    }
    if(line === words.length && loser === 0) turn = 0;
    answer = [loser, turn]
    
    
    return answer;
}