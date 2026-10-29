S  = input().split()
if (len(S) % 2 == 0):
    half_word = S[:len(S)//2]
else:
    half_word = S[:len(S)//2+1]
print(half_word)
