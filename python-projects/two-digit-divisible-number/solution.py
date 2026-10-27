N = input()
if (int(N) % int(N[0]) == 0) and (int(N) % int(N[1]) == 0):
    print(int(N) * 2)
else:
    print(int(N))
