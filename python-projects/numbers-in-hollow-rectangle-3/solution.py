def Numbers_in_Hollow_spaces():
    M,N = int(input()),int(input())
    K = (M*N)
    for i in range(1,M+1):
        for j in range(1,N+1):
            if (i == 1 or i == M or j == 1 or j == N):
                row = ""
                row += str(K) + " "
                print(row,end="")
                K -= 1
            else:
                row = ""
                row += "  "
                print(row,end="")
                K -= 1
        print()
Numbers_in_Hollow_spaces()
