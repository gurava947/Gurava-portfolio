S = input()
start_index = ""
for char in S:
    if (char == " "):
        break
    else:
        start_index += char
print(start_index)
