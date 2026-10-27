def butterfly():
    N = int(input())
    for row in range(1,N):
        hollow_sapces = (N - row)* "    "
        stars = row * "* "
        print(stars + hollow_sapces + stars)
    print((N * 2) * ("* "))
    print((N * 2) * ("* "))
    for row in range(1,N):
        hollow_sapces = row * "    "
        stars = (N - row) * "* "
        print(stars + hollow_sapces + stars)
butterfly()
