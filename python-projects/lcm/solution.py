M,N=int(input()),int(input())

if (M > N):
    greatest_num = M
else:
    greatest_num = N
for i in range(greatest_num,(M * (N+1))):
    if (i % M == 0 and i % N == 0):
        print(i)
        break
