def Number_in_square():
    N = int(input())
    Number = 1
    for i in range(N):
        for j in range(N):
            print(Number,end=" ")
            Number += 1
        print()
Number_in_square()
