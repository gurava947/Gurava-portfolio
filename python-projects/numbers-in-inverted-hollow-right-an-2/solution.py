def Numbers_in_Inverted_Hollow_Right_Angle_Triangle():
    N = int(input())
    start_number = 1
    for row in range(1,N+1):
        if (row == 1):
            First_row = ""
            for column in range(N):
                First_row += str(start_number) + " "
                start_number += 1
            print(First_row)
        elif(row == N):
            last_row = str(start_number) + " "
            print(last_row)
        else:
            each_row = str(start_number) + " "
            hollow_spsces = (N - row -1) * ("  ")
            each_row += hollow_spsces
            start_number += int(len(hollow_spsces)/2) + 1
            each_row += str(start_number) + " "
            start_number += 1
            print(each_row)
Numbers_in_Inverted_Hollow_Right_Angle_Triangle()
