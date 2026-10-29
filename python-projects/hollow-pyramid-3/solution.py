N = int(input())
print("| ")
for i in range(2,N+1):
    if (i == 0):
        pass
    else:
        print("|" + (i-2) * (" ") + " \ ")
for j in range(2,N+1):
    if (j == 0):
        pass
    else:
        print("|" + (N - j) * (" ") + " / ")
print("| ")
