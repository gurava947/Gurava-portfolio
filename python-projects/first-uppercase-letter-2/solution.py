def get_first_upper_letter(string):
    for i in string:
        if (i.isupper()):
            string = i
            break
    return string
string = input()
upper_case_character = get_first_upper_letter(string)
print(upper_case_character)
