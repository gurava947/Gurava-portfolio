def PrimeNumberCheck():
    N = int(input())
    factores = 0
    for i in range(2,N):
        if (N % i == 0):
            factores += 1
    if (factores == 0):
        check = "Prime Number"
    else:
        check = "Not a Prime Number"
    print(check)
PrimeNumberCheck()
