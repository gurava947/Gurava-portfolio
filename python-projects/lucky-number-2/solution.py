N = input()
if (int(N) % 9 == 0) or (int(N[0]) == 9 or int(N[1]) == 9):
    print("Lucky Number")
else:
    print("Unlucky Number")
