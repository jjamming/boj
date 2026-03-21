import collections

def solution(participant, completion):
    answer = ''
    p = collections.Counter(participant)
    c = collections.Counter(completion)
    return list(p - c)[0]