def M_TO_N_PrimeNumberCheck():
    M,N = int(input()),int(input())
    for Number in range(M,N+1):
        Factore = 0
        for i in range(2,Number):
            if (Number % i == 0):
                Factore += 1
        if (Factore == 0):
            print(Number)
M_TO_N_PrimeNumberCheck()
