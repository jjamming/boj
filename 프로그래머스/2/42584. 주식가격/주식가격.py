def solution(prices):
    n = len(prices)
    answer = [0] * n
    stack = []
    
    for i, price in enumerate(prices):
        while len(stack) > 0 and prices[stack[-1]] > price:
            j = stack.pop()
            answer[j] = i - j
        
        stack.append(i)
        
        
    while len(stack) > 0:
        idx = stack.pop()
        answer[idx] = n - 1 - idx
        
    return answer