n = int(input())
for i in range(1, n+1):
    spaces = " "*(n - i)
    left_nums = ""
    right_nums = ""
    for j in range(i):
        left_nums = str(j+1) + left_nums
        right_nums = right_nums + str(j+1)
    print(spaces + left_nums + right_nums[1:])
