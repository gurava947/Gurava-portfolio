def Armstrong_Number_BetWeen_Two_intervals():
    N,M = int(input()),int(input())
    Armestrong  = ""
    for Number in range(N,M+1):
        Digits = 0
        Number = str(Number)
        Powers = len(Number)
        for i in Number:
            i = int(i)
            Digits += (i ** Powers)
        if (Digits == int(Number)):
            Armestrong += Number + " "
    if (Armestrong):
        print(Armestrong)
    else:
        print(-1)
Armstrong_Number_BetWeen_Two_intervals()
