S = input().lower()
split_of_method = S.split()
for i in split_of_method:
    print(i[0] == i[-1])
