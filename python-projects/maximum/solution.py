N = int(input())
maximum = None
for i in range(N):
    A = int(input())
    if maximum is None or A > maximum:
        maximum = A
    print(maximum)
