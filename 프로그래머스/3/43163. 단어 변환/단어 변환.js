function solution(begin, target, words) {
    var answer = 0;
    const set = new Set(words);
    const wordLen = begin.length;
    
    if(!set.has(target)) return 0;
    
    const queue = [];
    let head = 0;
    let tail = 0;
    
    queue[tail++] = [begin, 0];
    
    while(head < tail){
        const [word, step] = queue[head++];
        
        if(word === target){
            answer = step;
            break;
        }
        
        for(const next of words){
            
            let _isOneChDiff = isOneChDiff(word, next);
            
            if(!_isOneChDiff) continue;
            
            queue[tail++] = [next, step+1];
            
        }
    }
    
    function isOneChDiff(ch, ch2){
        let diff = 0;
        for(let i = 0; i<wordLen; i++){
            if(ch[i] !== ch2[i]) diff++;
        }
        if(diff === 1) return true;
        else return false;
    }
    
    return answer;
}

