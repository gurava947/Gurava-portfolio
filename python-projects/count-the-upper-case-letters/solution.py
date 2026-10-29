def count_of_uppercase(word):
    count = 0
    for i in word:
       if (i.isupper()):
           count += 1
    return count
word = input()
result = count_of_uppercase(word = word)
print(result)
