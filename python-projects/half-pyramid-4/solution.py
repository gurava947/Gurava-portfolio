def Halif_Pyrimed():
    X,Y = int(input()),int(input())
    Add = 0
    for Number in range(1,Y+1):
        Add += Number
    Start = (Add + X - 1)
    for i in range(Y):
        for j in range(i+1):
            print(Start,end = " ")
            Start -= 1
        print()
Halif_Pyrimed()
