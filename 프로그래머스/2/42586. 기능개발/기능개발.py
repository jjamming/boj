import math

def solution(progresses, speeds):
    answer = []
    done = [math.ceil((100 - p) / s) for p, s in zip(progresses, speeds)]
    
    currentDay = done[0]
    count = 1
    
    for d in done[1:]:
        if d <= currentDay:
            count+=1
        else:
            answer.append(count)
            count = 1
            currentDay = d
        
    answer.append(count)
    return answer