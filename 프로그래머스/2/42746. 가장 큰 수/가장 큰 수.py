from functools import cmp_to_key

def solution(numbers):
    nums = list(map(str, numbers))
    nums.sort(key=cmp_to_key(lambda a, b: int(b+a) - int(a+b)))
    return str(int(''.join(nums)))