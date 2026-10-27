A,B = int(input()),int(input())
for i in range(1,A+1):
    value = 7
    for j in range(1,B+1):
        if (i == 1 or i == A or j == 1 or j == B):
            print(value,end = " ")
            value += 1
        else:
            print(" ",end = " ")
            value += 1
    print()
