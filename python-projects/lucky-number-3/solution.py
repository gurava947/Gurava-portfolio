N = input()
if (int(N) % 6 == 0):
    print("Number is divisible by 6")
elif (int(N) % 3 == 0):
    print("Number is divisible by 3")
elif (int(N) % 2 == 0):
    print("Number is divisible by 2")
else:
    print("Number is not divisible by 2, 3 or 6")
