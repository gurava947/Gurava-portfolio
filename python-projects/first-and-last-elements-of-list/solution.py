New_list = []
N = int(input())
for i in range(N):
    Number = int(input())
    New_list += [Number]
print(New_list[:2] + New_list[-2:])
