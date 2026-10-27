def Number_in_ractangle():
    X,Y = int(input()),int(input())
    Number = (X*Y)
    for i in range(X):
        row = ""
        for j in range(Y):
            row += (str(Number) + " ")
            Number -= 1
        print(row)
Number_in_ractangle()
