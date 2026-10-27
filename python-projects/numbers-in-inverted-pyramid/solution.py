def Numbers_In_Inverted_Pyramid():
    N = int(input())
    for i in range(1,N+1):
        sapces = (i-1) * " "
        row = ""
        for j in range(N-i+1):
            row += str(j+1) + " "
        print(sapces+row)
Numbers_In_Inverted_Pyramid()
