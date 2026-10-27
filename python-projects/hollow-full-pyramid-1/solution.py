def Hollow_full_Pyramid():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            left_spaces = (N-1) * (" ")
            row += left_spaces + "* "
            print(row)
        elif(i == N):
            row = ""
            row += (N) * ("* ")
            print(row)
        else:
            row = ""
            left_spaces = (N-i) *(" ")
            middel_sapces = (i-2)*("  ")
            row += left_spaces + "* " + middel_sapces + "* "
            print(row)
Hollow_full_Pyramid()
