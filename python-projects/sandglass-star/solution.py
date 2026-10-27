N = int(input())
def sandglass_stars(N):
    for i in range(N):
        left_sapces = i * (" ")
        row = ""
        for j in range(N-i):
            row += "* "
        print(left_sapces + row)
    for i in range(1,N):
        left_sapces = (N-i-1) * (" ")
        row = ""
        for j in range(i+1):
            row += "* "
        print(left_sapces + row)
sandglass_stars(N)
