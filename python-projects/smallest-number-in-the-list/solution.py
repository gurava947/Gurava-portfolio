S = input()
split_num = S.split()
new_list = []
for i in split_num:
     new_list += [int(i)]
print(min(new_list))
