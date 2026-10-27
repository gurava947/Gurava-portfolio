N = input()
if (int(N[0]) ** len(N)) + (int(N[1]) ** len(N)) + (int(N[2]) ** len(N)) + (int(N[3]) ** len(N)) == int(N):
    print("Armstrong Number")
else:
    print("Not an Armstrong Number")
