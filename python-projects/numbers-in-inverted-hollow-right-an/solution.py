def Numbers_in_inverted_Hollow_right_angle_triangle():
    startNumber = int(input())
    N = int(input())
    for row in range (1,N+1):
        spaces = (row - 1)*("  ")
        if (row == 1):
            fist_row = ""
            for column in range(N):
                fist_row += str(startNumber) + " "
                startNumber += 1
            print(spaces + fist_row)
        elif(row == N):
            last_row = str(startNumber) + " "
            print(spaces + last_row)
        else:
            each_row = str(startNumber) + " "
            middle_sapces = ("  ") * (N - row - 1)
            each_row += middle_sapces
            startNumber += 1
            each_row += str(startNumber) + " "
            startNumber += 1
            print(spaces + each_row)
Numbers_in_inverted_Hollow_right_angle_triangle()
