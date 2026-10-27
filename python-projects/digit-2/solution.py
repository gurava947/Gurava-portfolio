def two_digits():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1 or i ==N):
            print(N * "* ")
        else:
            left_sapces = ((N-1) * "  ")
            print(left_sapces + "* ")
    for i in range(1,N):
        if (i == N-1):
            print(N * "* ")
        else:
            left_sapces = ((N-1) * "  ")
            print("* " + left_sapces)
two_digits()
