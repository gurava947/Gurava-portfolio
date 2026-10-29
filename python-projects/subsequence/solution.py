M,N = input(),input()
word_index = 0
for i in M:
    if (i == N[word_index]):
        word_index += 1
        if (len(N) == word_index):
           break
if (word_index == len(N)):
    print("Yes")
else:
    print("No")
