S = input().split()
word = ""
for i in S:
    word = word + "." + i[0]
print(word[1:])
