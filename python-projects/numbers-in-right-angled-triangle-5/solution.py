def Numbers_in_Right_Angle_Trangle():
    S,N,K = int(input()),int(input()),0
    Total = 0
    for Num in range(1,N+1):
        K += Num
    Total = (K + S - 1)
    for i in range(1,N+1):
        for j in range(i):
            print(Total,end=" ")
            Total -= 1
        print()
Numbers_in_Right_Angle_Trangle()
