def unicodeValue():
    S = input()
    for i in S:
        if i.isupper():
            num_char = ord(i) 
            break
    print(num_char)
unicodeValue()
