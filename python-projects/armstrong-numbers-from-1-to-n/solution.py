def ArmstrongNumber_from_1_To_N():
    N = int(input())
    for Number in range(1,N+1):
        Digits = 0
        Number = str(Number)
        power = len(Number)
        for A in Number:
            A = int(A)
            Digits += A ** power
        if(Digits == int(Number)):
            print(Number)
ArmstrongNumber_from_1_To_N()
