M,N = int(input()),int(input())
prime_fisrt = ""
for Number in range(M,N+1):
    factors = 0
    for i in range(1,Number+1):
        if(Number % i == 0):
            factors += 1
    if(factors == 2):
        prime_fisrt += str(Number)
        break
if prime_fisrt:
    print(prime_fisrt)
else:
    print("No prime numbers in the given range")
