S = input()
divisible_3_numbers = []
for i in S.split():
    Num = int(i)
    if (Num % 3 == 0):
        divisible_3_numbers += [Num]
print(divisible_3_numbers)
