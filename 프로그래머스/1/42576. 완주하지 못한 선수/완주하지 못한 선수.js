function solution(participant, completion) {
    var answer = '';
    const players = new Map();
    
    for(let p of participant){
        players.set(p, (players.get(p) || 0) + 1 )
    }
    
    for(let c of completion){
        players.set(c, players.get(c) - 1)
    }
    
    for(let [p, count] of players){
        if(count > 0) answer = p;
    }
    return answer;
}