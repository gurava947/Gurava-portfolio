def is_prime(number):
    factore = 0
    for i in range(1,number+1):
        if (number % i == 0):
            factore += 1
    if (factore == 2):
        print("Prime Number")
    else:
        print("Not a Prime Number")
number = int(input())
result = is_prime(number)
