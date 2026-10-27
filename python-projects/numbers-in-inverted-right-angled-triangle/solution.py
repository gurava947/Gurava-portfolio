def Number_In_Inverted_right_angle():
    N = int(input())
    for i in range(1,N+1):
        for j in range (N-i+1):
            print(j+1 ,end=" ")
        print()
Number_In_Inverted_right_angle()
