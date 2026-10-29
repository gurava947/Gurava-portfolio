def isPrimeNumbers(N):
    list_values = ""
    for number in range(2,N+1):
        factores = 0
        for i in range(1,number+1):
            if (number % i == 0):
                factores += 1 
        if (factores == 2):
            list_values += str(number) + ' '
    print(list_values)
N = int(input())
isPrimeNumbers(N)
