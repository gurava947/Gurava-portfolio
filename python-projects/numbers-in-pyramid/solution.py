def Number_in_Pyramid():
    X,Y = int(input()),int(input())
    for i in range(1,Y+1):
        spaces = (Y-i) * (" ")
        row = ""
        X_count = X
        for j in range(i):
            row += str(X_count) + " "
            X_count += 1
        print(spaces+row)
Number_in_Pyramid()
