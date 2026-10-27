N,K = int(input()),1
for i in range(N):
    rows = ""
    for j in range(i+1):
        rows = rows + str(K) +" "
        K += 1
    print(rows)
