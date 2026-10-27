Word,ending_spaces_index = input(),0
first_word = ""
for i in Word:
    if (i == " "):
        break
    else:
        first_word += i.upper()
print(first_word + Word[len(first_word) : ])
