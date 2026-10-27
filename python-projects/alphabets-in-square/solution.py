def Alphabets_in_square():
    N = int(input())
    Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for i in range(N):
        for j in range(N):
            row = ""
            row += Alpha[j] + " "
            print(row,end="")
        print()
Alphabets_in_square()
