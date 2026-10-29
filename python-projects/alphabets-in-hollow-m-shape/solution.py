N = int(input())
Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,N+1):
    left_row = (N-i) * (" ")
    if (i == 1):
        first_row = ""
        first_row += (Alpha[i-1] + " ")
        print(left_row + first_row + (N-i)* ("  ") + first_row)
    else:
        last_row = ""
        hollow_sapces = (i-2) * ("  ")
        last_row += (Alpha[i-1] + " ") + hollow_sapces +  (Alpha[i-1] + " ")
        print(left_row + last_row + (N-i)* ("  ") + last_row)
