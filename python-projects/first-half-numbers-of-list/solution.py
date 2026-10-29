Numbers = input().split()
length = len(Numbers)
for each_num_index in range(length):
    Numbers[each_num_index] = int(Numbers[each_num_index])

if (length % 2 == 0):
    half_list_length = length // 2
else:
    half_list_length = (length // 2) + 1
first_half_list = Numbers[:half_list_length]
print(first_half_list)
