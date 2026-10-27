N = int(input())
string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(N):
    each_row = ""
    for j in range(N-i):
        each_row += string[j] +" "
    print(each_row)
