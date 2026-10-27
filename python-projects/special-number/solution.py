N = input()
if (int(N[0]) + int(N[1]) == 7) or (int(N[0]) == 7 or int(N[1]) == 7) or (int(N) % 7 == 0):
    print("Special Number")
else:
    print("Normal Number")
