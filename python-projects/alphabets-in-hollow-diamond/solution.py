N = int(input())
Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
count = 0
for i in range(1,N+1):
    left_spaces = (N-i) * (" ")
    if (i == 1):
        first_row = (Alpha[count]+" ")
        print(left_spaces + first_row)
        count += 1
    else:
        print(left_spaces + (Alpha[count]+" ") + 2*(i-2) *(" ") + (Alpha[count+1]+" "))
        count += 2
for j in range(1,N):
    left_spaces = (j) * (" ")
    if (j == N-1):
        first_row = (Alpha[count-3]+" ")
        print(left_spaces + first_row)
        count -= 1
    else:
        print(left_spaces + (Alpha[count-4]+" ") + (N-j-2) * ("  ") + (Alpha[count-3]+" "))
        count -= 2
