def Number_in_Right_Angled_Triagle():
    X,Y = int(input()),int(input())
    for i in range(1,Y+1):
        for j in range(i*2):
            print(X,end=" ")
            X += 1
        print()
Number_in_Right_Angled_Triagle()
