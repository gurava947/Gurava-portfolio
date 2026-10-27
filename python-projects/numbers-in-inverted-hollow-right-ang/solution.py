def Numbers_in_Inverted_hollow_Spaces():
    M,N = int(input()),int(input())
    start_num = (M-1)
    for count in range(N):
        each_count = (N - count)
        start_num += each_count
    for row in range(1,N+1):
        left_sapces = (row-1) * ("  ")
        if (row == 1):
            firt_row = ""
            for i in range(N):
                firt_row += str(start_num) + " "
                start_num -= 1
            print(firt_row)
        elif (row == N):
            last_row = str(M) + " "
            print(left_sapces + last_row)
        else:
            each_row = str(start_num) + " "
            hollow_spaces = (N - row -1) * ("  ")
            each_row += hollow_spaces
            start_num -= int(len(hollow_spaces)/2) + 1
            each_row += str(start_num) + " "
            start_num -= 1
            print(left_sapces + each_row)
Numbers_in_Inverted_hollow_Spaces()
