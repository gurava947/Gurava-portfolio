S = input()
New_word = " " + S
Word = ""
for i in range(len(New_word)):
    if (New_word[i-1] == " "):
        Word += chr(ord(S[i-1]) + 1)
    else:
        Word += New_word[i]
output = Word[0].replace(" ","") + Word[1:]
print(output)
