def get_lower_and_upper_case_letters(word):
    value_1,value_2 = "",""
    for i in word:
        if (i.isupper()):
            value_1 += i
        elif (i.islower()):
            value_2 += i
    print(value_1)
    print(value_2)
word = input()
get_lower_and_upper_case_letters(word)
