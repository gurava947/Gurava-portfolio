def Pythagoras_Triplets():
    N = int(input())
    Triplest = 0
    for A in range(1,N+1):
        for B in range(A+1,N+1):
            for C in range(B+1,N+1):
                if (((A) ** 2) + ((B) ** 2) == ((C) ** 2)):
                    Triplest += 1
    print(Triplest)
Pythagoras_Triplets()
