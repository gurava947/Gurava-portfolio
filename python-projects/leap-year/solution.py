Y = int(input())

if (Y % 4 == 0):
    if (Y % 100 == 0):
        print(False)
    else:
        print(True)
else:
    print(False)
