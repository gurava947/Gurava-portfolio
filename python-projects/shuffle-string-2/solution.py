def shuffleString():
    S1 = input()
    S2 = input()
    result = ""
    for i in range(len(S1)):
        if (i % 2 == 0):
            result += S1[i]
        else:
            result += S2[i]
    print(result)
shuffleString()
