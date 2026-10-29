def count_the_vowels(word):
    count = 0
    for i in word:
        for j in Vowels:
            if (i == j):
               count += 1
    return count
word = input()
Vowels = "aeiou"
Total = count_the_vowels(word=word)
print(Total)
