def Number_Diamod():
    N = int(input())
    for i in range(1,N+1):
        space = (N-i) * (" ")
        row = ""
        for j in range(i):
            row += str(j+1) + " "
        print(space + row)
    for i in range(1,N):
        space = (i) * (" ")
        row = ""
        for j in range(N-i):
            row += str(j+1) + " "
        print(space + row)
Number_Diamod()
