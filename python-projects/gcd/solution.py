M,N = int(input()),int(input())
if (M > N):
    Number = M
else:
    Number = N
gcd = 0
for i in range(1,Number +1):
    if(M % i == 0 and N % i == 0):
        gcd = i
print(gcd)
