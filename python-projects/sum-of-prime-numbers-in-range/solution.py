def Sum_of_Numbers_In_Range():
    M,N = int(input()),int(input())
    Adding_prime = 0
    for Number in range(M,N+1):
        factors = 0
        for i in range(2,Number):
            if (Number % i == 0):
                factors += 1
        if (factors == 0):
            Adding_prime += Number
    print(Adding_prime)
Sum_of_Numbers_In_Range()
