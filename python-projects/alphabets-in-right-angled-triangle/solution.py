N = int(input())
AlphaBites = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,N+1):
    print((N-i)*("  "),end ="")
    count = 0
    for j in range(i):
        print(AlphaBites[count],end=" ")
        count += 1
    print()
