def Number_in_square():
    N = int(input())
    for i in range(N):
        row = ""
        for j in range(N):
            # row = (" " +str(N-j)) + row
            row = row + (str(N-j) + " ")
        # print(row[::-1])
        print(row)
Number_in_square()
