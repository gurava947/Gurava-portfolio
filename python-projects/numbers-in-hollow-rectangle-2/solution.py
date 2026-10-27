M,N = int(input()),int(input())
Count = 1
for i in range(1,M+1):
    for j in range(1,N+1):
        if (i == 1 or i == M or j == 1 or j == N):
            print(Count,end=" ")
            Count += 1
        else:
            print(" ",end=" ")
            Count += 1
    print()
