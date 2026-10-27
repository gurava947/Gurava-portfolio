def Numbers_in_Hollow_spaces():
    X,N = int(input()),int(input())
    K = X
    for i in range(1,N+1):
        for j in range(1,N+1):
            if (i == 1 or i == N or j == 1 or j == N):
                print(K,end=" ")
                K += 1
            else:
                print("  ",end="")
                K += 1
        print()
Numbers_in_Hollow_spaces()
