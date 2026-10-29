def check_divisible_by_9(first_number, second_number, third_number):
    if (first_number % 9 == 0 or second_number % 9 == 0 or third_number % 9 == 0):
        value = True
    else:
        value = False
    return value
first_number = int(input())
second_number = int(input())
third_number = int(input())
result = check_divisible_by_9 (first_number , second_number ,third_number)
print(result)
