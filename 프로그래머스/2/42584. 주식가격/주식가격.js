function solution(prices) {
    const n = prices.length;
    const answer = Array(n).fill(0);
    const stack = [];
    
   for(let i = 0; i<n; i++){
       while(stack.length && prices[stack[stack.length - 1]] > prices[i]){
           const top = stack.pop();
           answer[top] = i - top;
       }
       stack.push(i);
   }
    
    while(stack.length) {
        const top = stack.pop();
        answer[top] = n - 1 - top;
    }
    
    
    return answer;
}