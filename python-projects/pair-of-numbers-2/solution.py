A = int(input())
B = int(input())
if (A % 3 == 0 and B % 3 == 0) and (A % 12 == 0 or B % 12 == 0):
    print("Pair")
else:
    print("Not a Pair")
