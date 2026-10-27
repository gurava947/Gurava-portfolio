def solid_diamod():
    N = int(input())
    for i in range(1,N+1):
        for j in range(1,i+1):
            print("* ",end="")
        print()
    for i in range(1,N):
        for j in range(1,N-i+1):
            print("* ",end="")
        print()
solid_diamod()
