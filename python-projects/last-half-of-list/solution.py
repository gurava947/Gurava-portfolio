N = int(input())
word = input().split()

if (len(word) % 2 == 0):
    half = (word[len(word)//2:])
else:
    half = (word[len(word)//2+1:])
list_Num = []
for i in half:
    i = int(i)
    list_Num += [i]
print(list_Num)
