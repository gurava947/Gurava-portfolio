N = int(input())
for i in range(1,N+1):
    values = N
    for j in range(1,N+1):
        if (i == 1 or i == N or j == 1 or j == N):
            print(str(values) + " ",end = "")
            values -= 1
        else:
            print(" ",end = " ")
            values -= 1
    print()
