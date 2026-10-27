N = int(input())
for i in range(1,N+1):
    rows = ""
    for j in range(1,N-i+2):
        rows = str(j) + rows
    print(rows)
