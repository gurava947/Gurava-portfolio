N = int(input())
New_list = []
for i in range(N):
    list_char = input()
    New_list += [list_char]
print(New_list[:3] + New_list[N-3:])
