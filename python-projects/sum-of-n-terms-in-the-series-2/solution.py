X,N = float(input()),int(input())
total,count  = 0 , 2
for i in range(1,N+1):
    power_in_termes = i
    total += (X ** power_in_termes)
    count_value = count
print(round(total,(count_value+2)))
