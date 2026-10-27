def Numbers_in_Hollow_Right_Angled_Triangle():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            print("1 ")
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+1) + " "
            print(row)
        else:
            row = ""
            middle_sapces = (i-2)*("  ")
            row += "1 " + middle_sapces + str(i)
            print(row)
Numbers_in_Hollow_Right_Angled_Triangle()
