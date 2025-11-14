function solution(brown, yellow) {
    var answer = [];
    
    let start = Math.ceil(yellow / 2)
    for(let y = 1; y<=yellow; y++){
        
        let width = y;
        let height = yellow / y;
        
        // 필요한 brown 개수 === (yellow.width + 2) * 2 + yellow.height * 2
        let neededBrown = (width + 2) * 2 + (height * 2)
        if(neededBrown === brown){
            answer.push(width + 2);
            answer.push(height + 2);
            break;
        }
    }
    
    return answer.sort((a,b)=> b-a);
}