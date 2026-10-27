def AlphabeticEymboles():
    N = int(input())
    Alpha = "ABCDEFGHIJKLMNOPQRSTVWXYZ"
    for row in range(N):
        count = 0
        for col in range(row + 1):
            print(Alpha[count],end=" ")
            count += 1
        print()
AlphabeticEymboles()
