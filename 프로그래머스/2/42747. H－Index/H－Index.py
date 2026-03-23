def solution(citations):
    citations.sort(reverse = True)
    
    # 6, 5, 3, 1, 0
    for i, c in enumerate(citations):
        if c < i + 1:
            return i
        
    return len(citations)