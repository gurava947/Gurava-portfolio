def Numbers_in_pyrimid():
    N = int(input())
    num = 1
    for row in range(1,N+1):
        left_sapces = (N - row) * ("0 ")
        row  = ""
        for column in range(num):
            row += "1 " 
        print(left_sapces + row + left_sapces,end="")
        print()
        num += 2
Numbers_in_pyrimid()
