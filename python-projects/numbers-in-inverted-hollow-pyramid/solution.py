def Numbers_in_Inverted_Hollow_Pyarmid():
    X,Y = int(input()),int(input())
    Number = Y
    for i in range(1,X+1):
        if (i == 1):
            row = ""
            for j in range(X):
                row += str(Number) + ' '
                Number += 1
            print(row)
        elif(i == X):
            row = ""
            left_sapces = (X-1) * (" ")
            row += left_sapces + str(Y) + " "
            print(row)
        else:
            row = ""
            left_spaces = (i-1) * (" ")
            middle_Spaces = 2*(X-i-1) *(" ")
            row += left_spaces + str(Y) + " " + middle_Spaces + str(Y + X - i)
            print(row)
Numbers_in_Inverted_Hollow_Pyarmid()
