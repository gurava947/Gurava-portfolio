def Pair_of_number():
    N = int(input())
    Pair_count = 0
    for i in range(1,N+1):
        for j in range(i+1,N+1):
            if ((i+j) == N):
                Pair_count += 1
    print(Pair_count)
Pair_of_number()
