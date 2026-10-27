def Indivisble_Number():
    N = int(input())
    DivisibleCount = 0
    for Num in range(1,N+1):
        CheckSatues = True
        for i in range(2,11):
            if (Num % i == 0):
                CheckSatues = False
                break
        if (CheckSatues == True):
            DivisibleCount += 1
    print(DivisibleCount)
Indivisble_Number()
