def Hollow_spaces_inverted_half_Pyramid():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            for i in range(N):
                row += str(i+1) + " "
            print(row)
        elif(i == N):
            print(1,end=" ")
        else:
            row = ""
            middelSpaces = (N-i-1) *("  ")
            row += "1 " + middelSpaces + str(N-i+1)
            print(row)
Hollow_spaces_inverted_half_Pyramid()
