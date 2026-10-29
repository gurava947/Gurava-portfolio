N = int(input())
total = 0
for i in range(1,N+1):
    num = int(input())
    total += num
    print(round((total)/i,3))
