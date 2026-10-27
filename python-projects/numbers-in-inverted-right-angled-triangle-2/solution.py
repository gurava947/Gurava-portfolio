def Number_in_inverted_Right__Angle_Triangle():
    N = int(input())
    K = N * (N+1)//2
    for i in range(1,N+1):
        spaces = (i-1) * ("  ")
        print(spaces,end="")
        for j in range(N-i+1):
            print(K,end=" ")
            K -= 1
        print()
Number_in_inverted_Right__Angle_Triangle()
