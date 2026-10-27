N = int(input())
Factoes = 0
for i in range(2,N):
    if (N % i == 0):
        Factoes += 1
if (Factoes >= 2):
    print(True)
else:
    print(False)
