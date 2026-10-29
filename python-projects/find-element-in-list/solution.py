L = ["5", "eat", "9.80", "Water", "python", "-678", "7685.26", "-2.5", "sing"]

# Write your code here
find_char = input()
for i in range(len(L)):
    if (L[i] == find_char):
        check = True
        break
    else:
        check = False
print(check)
