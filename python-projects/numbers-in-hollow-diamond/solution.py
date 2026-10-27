def numbers_in_hollow_diamod():
    N  = int(input())
    for row in range(1,N+1):
        if(row == 1):
            Number_row = ""
            Number_row += (N-1) * (" ") + "1 "
            print(Number_row)
        elif(row == N):
            Number_row = ""
            hollow_spaces = (N-2)*("  ")
            Number_row += "1 " + hollow_spaces + str(row)
            print(Number_row)
        else:
            Number_row = ""
            left_spaces = (N-row) * (" ")
            hollow_spaces = (row-2) *("  ")
            Number_row += left_spaces + "1 " + hollow_spaces + str(row)
            print(Number_row)
    for row in range(1,N):
        if(row == N - 1):
            Number_row = ""
            Number_row += (N-1) * (" ") + "1 "
            print(Number_row)
        else:
            Number_row = ""
            left_sapces = row * (" ")
            hollow_spaces = (N - row - 2) * ("  ")
            Number_row += left_sapces + "1 " + hollow_spaces + str(N-row)
            print(Number_row)
        
numbers_in_hollow_diamod()
