def Composite_Numbers_in_the_Range():
    X,Y = int(input()),int(input())
    for Num in range(X,Y+1):
        factotres = 0
        for i in range(2,Num-1):
            if (Num % i == 0):
                factotres += 1
        if(factotres == 0):
            pass
        
        else:
            print(Num)
Composite_Numbers_in_the_Range()
