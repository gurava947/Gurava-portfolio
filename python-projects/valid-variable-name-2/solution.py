s = input()
first_s = ord(s[0])
is_upper = first_s >= 65 <= 90
is_lower = first_s >= 97 <= 122
special_char = chr(first_s) == "_"
check = is_upper or is_lower or special_char
print(check)
