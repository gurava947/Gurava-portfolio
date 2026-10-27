def is_prime ():
    for number in range(1,N+1):
        fact = 0
        for i in range(1,number+1):
            if (number % i == 0):
                fact += 1 
        if (fact == 2):
            print(number)
N = int(input())
is_prime()
