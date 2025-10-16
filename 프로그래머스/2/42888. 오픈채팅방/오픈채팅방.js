function solution(record) {
    var answer = [];
    let history = [];
    for(let i =0 ; i<record.length; i++){
        history.push(record[i].split(" "));
    }
    let idMap = new Map();
    for(let i =0; i<history.length; i++){
        let [command,id,nickname] = history[i];
        
        if(command === "Enter" || command === "Change"){
            idMap.set(id, nickname);
        }
    }
    for(let i = 0; i<history.length; i++){
        let [command, id, _nickname] = history[i];
        let nickname = idMap.get(id);
        if(command === "Leave"){
            answer.push(`${nickname}님이 나갔습니다.`);
        } else if(command === "Enter"){
            answer.push(`${nickname}님이 들어왔습니다.`)
        }
    }
    return answer;
}