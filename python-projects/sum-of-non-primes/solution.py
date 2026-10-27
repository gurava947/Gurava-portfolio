def Sum_of_Prime():
    N = int(input())
    add = 0
    for i in range(N):
        Num = int(input())
        count = 0
        for Number in range(1,Num+1):
            if (Num % Number == 0):
                count += 1
        if (count != 2):
           add += Num
    print(add)       
Sum_of_Prime()
