S,N =int(input()),int(input())
for i in range(N):
    row = ""
    for j in range(N):
        row += str(S+j) +" "
    print(row)
