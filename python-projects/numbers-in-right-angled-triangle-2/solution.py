def Number_in_Right_angle_Triagle():
    N = int(input())
    for i in range(N):
        row = ""
        spaces = (N-i-1) * "  "
        for j in range(i+1):
            row = (str(j+1)+ " ") + row
        print(spaces + row)
Number_in_Right_angle_Triagle()
