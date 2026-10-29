def compare_numbers(first_number, second_number):
    if ((second_number > 100 < first_number)) and (first_number < second_number):
        value = True
    else:
        value = False
    return value
first_number = int(input())
second_number = int(input())
is_true = compare_numbers (first_number = first_number , second_number = second_number)
print(is_true)
# print(first_number < second_number)
