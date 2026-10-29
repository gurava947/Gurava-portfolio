N = int(input())
New_list = []
for i in range(N):
    list_value = int(input())
    if (list_value % 5 == 0 or list_value % 10 == 0):
        New_list += [list_value]
print(New_list)
