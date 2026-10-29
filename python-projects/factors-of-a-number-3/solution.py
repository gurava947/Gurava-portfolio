def factors_of_n(number):
    factors = ""
    for i in range(1,number+1):
        if (number % i == 0):
            factors += str(i) + " "
    return factors
number = int(input())
result = factors_of_n(number)
print(result)
