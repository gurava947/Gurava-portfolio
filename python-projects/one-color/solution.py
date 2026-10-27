def oneColor():
    N = input()
    R,G = 0,0
    for i in N:
        if (i == "R"):
            R += 1
        else:
            G += 1
    if (R < G):
        print(R)
    else:
        print(G)
oneColor()
