N , T = int(input()),int(input())
New_list = []
for i in range(N):
    read_input = int(input())
    New_list += [read_input]

for j in range(T):
    index = int(input())
    print(New_list[index])
