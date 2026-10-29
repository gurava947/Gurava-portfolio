S,string = input(),""
for i in S:
    if (i == " "):
         string += chr((ord(i)))
    else:
        string += chr((ord(i) + 1))
print(string)
