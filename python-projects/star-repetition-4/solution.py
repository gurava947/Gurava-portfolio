Word = input()
lenght_of_Word = len(Word) -4
stars = lenght_of_Word * "*"
find_on_last_two_words = Word[-2:]
print(Word[:2] + stars +find_on_last_two_words)
