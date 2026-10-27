N = int(input())
for i in range(N):
    factores = 0
    Num = int(input())
    for number in range(1,Num+1):
        if (Num % number == 0):
            factores += 1
    if (factores == 2):
        print(Num)
        break
