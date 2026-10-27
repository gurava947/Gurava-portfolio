def printTheValue():
    N = input()
    if (N[-1] == "T"):
        output = int(N[:-1]) * 10
    elif (N[-1] == "H"):
        output = int(N[:-1]) * 100
    elif (N[-1] == "K"):
        output = int(N[:-1]) * 1000
    print(output)
printTheValue()
