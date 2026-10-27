def Right_Triangle():
    N = int(input())
    for i in range(1,N+1):
        for j in range(1,i+1):
            print(j,end="")
            row = ""
        for z in range(j-1):
            row = str(z+1) + row
        print(row)
    print()
Right_Triangle()
