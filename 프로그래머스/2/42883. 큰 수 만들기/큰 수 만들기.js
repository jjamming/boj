function solution(number, k) {
    const stack = [];
    let remove = k;
    
    for(const num of number){
        while(remove > 0 && stack.length > 0 && stack[stack.length - 1] < num){
            stack.pop();
            remove--;
        }
        stack.push(num);
    }
    
    while(remove > 0){
        stack.pop();
        remove--;
    }
    
    return stack.join("");
}