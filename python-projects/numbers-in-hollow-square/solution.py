def Number_in_Hollow_Square():
    N = int(input())
    for i  in range(1,N+1):
        for j in range(1,N+1):
            if (i == 1 or i == N or j == 1 or j == N):
                print(j,end=" ")
            else:
                print("  ",end="")
        print()
Number_in_Hollow_Square()
