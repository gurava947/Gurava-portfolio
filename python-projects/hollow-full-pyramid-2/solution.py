def Hollow_Spaces():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            spaces = (N-i) * (" ")
            row += (spaces + "1 ")
            print(row)
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+1) + " "
            print(row)
        else:
            row = ""
            left_Spaces = (N-i) * (" ")
            middle_Spaces = 2*(i-2) * (" ")
            row += left_Spaces + "1 " + middle_Spaces + str(i) + " " 
            print(row)
Hollow_Spaces()
