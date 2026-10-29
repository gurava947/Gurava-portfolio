M,N = int(input()),int(input())
value,count = 0,0
for i in range(M,N+1):
    value += i
    count += 1
print(value),print(value/count)
