def Full_pyrimed_2():
    N = int(input())
    for i in range(1,N+1):
        Spaces = (N-i) * (" ")
        row = ""
        for j in range(1,i+1):
            row += str(j) + " "
        print(Spaces + row)
Full_pyrimed_2()
