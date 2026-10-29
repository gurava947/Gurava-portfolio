S = input()
M,N = int(input()),int(input())
word = ""
for i in S:
    for j in range(M,N+1):
        if (ord(i) == j):
            word += chr(j) + " "
print(word)
