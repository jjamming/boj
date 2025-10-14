function solution(s){
    var answer = true;
    // "("라면 스택에 push, ")"라면 스택에서 pop
    // pop 할 수 없거나, arr가 빈 배열이 아니라면 false
    let arr = [];
    for(let i = 0; i<s.length; i++){
        if(s[i] === "\(") arr.push(1);
        else {
            if(arr.length === 0) {answer = false;  break;  }
            else arr.pop();
        }
    }
    if(arr.length > 0) answer = false;

    return answer;
}