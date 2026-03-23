from collections import Counter

def solution(clothes):
    answer = 1
    counts = Counter([type for name, type in clothes])
    
    for count in counts.values():
        answer *= (count + 1)
        
    return answer - 1