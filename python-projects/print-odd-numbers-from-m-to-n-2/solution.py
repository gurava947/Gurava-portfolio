def get_odd_numbers_in_range(start_number, end_number,odd):
    for i in range(start_number,end_number+1):
        if (i % 2 == 1):
            odd += str(i) + " "
    return odd
start_number = int(input())
end_number = int(input())
odd = ""
odd_numbers = get_odd_numbers_in_range(start_number,end_number,odd)
print(odd_numbers)
