import collections
def solution(nums):
    answer = 0
    myset = set(nums)
    
    N = len(nums);
    if len(myset) > N / 2:
        answer = N / 2
    else:
        answer = len(myset)
    return answer