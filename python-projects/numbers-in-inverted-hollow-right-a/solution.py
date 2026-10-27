def Numbers_in_Inverted_Hollow_spaces():
    N = int(input())
    start_number = 0
    for count in range(N):
        each_count = (N - count)
        start_number += each_count
    for row in range(1,N+1):
        if (row == 1):
            first_row = ""
            for i in range(N):
                first_row += str(start_number) + " "
                start_number -= 1
            print(first_row)
        elif(row == N):
            last_row = str(start_number) + " "
            print(last_row)
        else:
             middle_row = str(start_number) + " "
             hollow_spaces = (N - row - 1) * ("  ")
             middle_row += hollow_spaces
             start_number -= int(len(hollow_spaces)/2) + 1
             middle_row += str(start_number) + " "
             start_number -= 1
             print(middle_row)
Numbers_in_Inverted_Hollow_spaces()
