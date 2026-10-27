def Numbers_in_Angle_Trinagle():
    X,Y = int(input()),int(input())
    start = X
    for i in range(Y):
        for j in range(i+1):
            print(start,end=" ")
            start += 1
        print()
Numbers_in_Angle_Trinagle()
