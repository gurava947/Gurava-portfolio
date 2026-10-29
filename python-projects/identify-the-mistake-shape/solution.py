n = int(input())
for i in range(0, n):
    row_out = " " * (n-i-1)
    row_out = row_out + "$" * n
    print(row_out)
