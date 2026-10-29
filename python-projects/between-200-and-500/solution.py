def is_between_200_and_500(number):
    result = "Yes" if 200 < number < 500 else 'No'
    return result
number = int(input())
output = is_between_200_and_500(number=number)
print(output)
