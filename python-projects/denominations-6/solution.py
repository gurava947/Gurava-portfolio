A = int(input())
nots = [1000,500,100,50,20,5,1]

for n in nots:
    count = A // n
    print(F"{n}:{count}")
    A %= n
