s = input()
count = 0
for i in range(len(s)):
    if (s[i] == " "):
        continue
    else:
        word = ord(s[i]) - 1
        print(chr(word))
