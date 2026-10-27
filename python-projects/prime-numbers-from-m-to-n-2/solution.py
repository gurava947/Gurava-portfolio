def is_prime(prime_number,M,N):
    for number in range(M,N+1):
        if number < 2:
            continue
        fact = 0
        for i in range(2,number):
            if (number % i == 0):
                fact += 1
        if (fact == 0):
            prime_number = prime_number + " " + str(number)
    return prime_number
def retun_values ():
    M = int(input())
    N = int(input())
    prime_number = ""
    prime_number = is_prime(prime_number,M,N)
    if len(prime_number) > 0:
            print(prime_number[1:])
    else:
        print("No Prime Numbers Found")
retun_values()
