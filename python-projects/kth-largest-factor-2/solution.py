N,K = int(input()),int(input())
for i in range(N):
    if (N % (N - i) == 0):
        large_fact = (N - i)
        K = (K-1)
    if (K == 0):
        break
print(large_fact)
