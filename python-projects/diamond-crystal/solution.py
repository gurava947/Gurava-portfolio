N = int(input())
for i in range(1,N+1):
    left_sapces = (N-i) *(" ")
    if (i == 1):
        print(left_sapces + "/" + "\ ")
    else:
        print(left_sapces + "/" + 2*(i-1)*(" ") + "\ ")
for j in range(1,N+1):
    left_sapce = (j-1) *(" ")
    if (j == N):
        print(left_sapce + "\\" +  "/")
    else:
        print(left_sapce + "\\" + (N-j) *("  ") + "/")
