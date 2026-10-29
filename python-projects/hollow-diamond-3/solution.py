T = input()
for i in T:
    if (i == "M"):
        print(str(round(int(T[:len(T)-1])/60,2)) + "H")
    elif (i == 'S'):
        print(str(round(int(T[:len(T)-1])/3600,2))+"H")
