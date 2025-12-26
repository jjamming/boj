import sys
input = sys.stdin.readline

N = int(input().strip())

min0 = min1 = min2 = 0
max0 = max1 = max2 = 0

for i in range(N):
    a, b, c = map(int, input().split())

    if i == 0:
        min0 = max0 = a
        min1 = max1 = b
        min2 = max2 = c
    else:
        nMin0 = min(min0, min1) + a
        nMin1 = min(min0, min1, min2) + b
        nMin2 = min(min1, min2) + c

        nMax0 = max(max0, max1) + a
        nMax1 = max(max0, max1, max2) + b
        nMax2 = max(max1, max2) + c

        min0, min1, min2 = nMin0, nMin1, nMin2
        max0, max1, max2 = nMax0, nMax1, nMax2

print(max(max0, max1, max2), min(min0, min1, min2))