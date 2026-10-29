def get_even_numbers_count(numbers,count):
    for i in numbers:
        num = int(i)
        if (num % 2 == 0):
            count += 1
    return count
numbers = input().split()
count = 0
result = get_even_numbers_count(numbers,count)
print(result)
