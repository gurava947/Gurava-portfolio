N = input().split()
add = 0
for i in N:
    i = int(i)
    add += i
print(round(add/len(N),2))
