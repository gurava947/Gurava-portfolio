S,word= input(),""
for i in S:
    word += i+","
print(word[:len(word)-1])
