N = int(input())
New_list = []
for i in range(N):
    list_char = input()
    New_list += [list_char]
for i in New_list[::-1]:
    print(i)
