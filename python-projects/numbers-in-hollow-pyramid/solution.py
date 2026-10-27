def Number_in_Hollow_Spaces():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            left_spaces = (N-1) * (" ")
            row += left_spaces + "5 "
            print(row)
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+5) + " "
            print(row)
        else:
            row = ""
            left_sapces = (N-i) * (" ")
            middel_sapces = (i-2) * ("  ")
            row += left_sapces + "5 " + middel_sapces + str(i+4)
            print(row)
Number_in_Hollow_Spaces()
