def Hollow_Inverted_spaces_full_Pyrimid():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            for j in range(N):
                row += str(j+1) + " "
            print(row)
        elif(i == N):
            row = ""
            left_spces = (N-1)*(" ")
            row += left_spces + "1 "
            print(row)
        else:
            row = ""
            left_spces = (i-1) * (" ")
            middle_spaces = (N-i-1) * ("  ")
            row += left_spces + "1 " + middle_spaces + str(N-i+1)
            print(row)
Hollow_Inverted_spaces_full_Pyrimid()
