def Number_In_Inverted_Right_Angled_Triangle():
    X,Y = int(input()),int(input())
    Start = 0
    for num in range(1,Y+1):
        Start += num
    Total = (Start + X - 1)
    for i in range(Y):
        for j in range(Y-i):
            print(Total,end=" ")
            Total -= 1
        print()
Number_In_Inverted_Right_Angled_Triangle()
