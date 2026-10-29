def PrimeNumber_m_n():
    primeNumbers = ""
    for Number in range(M,N+1):
        factores = 0
        for i in range(1,Number+1):
            if (Number % i == 0):
                factores += 1
        if (factores == 2):
            primeNumbers += " " + str(Number)
    print(primeNumbers[1:])
M,N = int(input()),int(input())
PrimeNumber_m_n()
