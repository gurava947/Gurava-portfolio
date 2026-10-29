def calculate_percentage(number):
    return ((5 / 100)*number) if (1000 > number) else ((10 / 100)*number)
        
number = int(input())
result = calculate_percentage (number = number)
print(result)
