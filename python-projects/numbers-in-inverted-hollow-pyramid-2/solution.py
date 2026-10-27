def Numbers_in_inverted_Hollow_spaces():
    S,N = int(input()),int(input())
    start_num = (S)
    for row in range(1,N+1):
        left_spaces  = (row - 1) * (" ")
        if (row == 1):
            first_row = ""
            for i in range(N):
                first_row += str(start_num) + " "
                start_num += 1
            print(first_row)
        elif(row == N):
            last_row = str(start_num) + " "
            print(left_spaces + last_row)
        else:
            each_row = str(start_num) + " "
            hollow_spaces = (N - row -1) * ("  ")
            each_row += hollow_spaces 
            start_num += int(len(hollow_spaces)/2) + 1
            each_row +=  str(start_num) + " "
            start_num += 1
            print(left_spaces + each_row)
Numbers_in_inverted_Hollow_spaces()
