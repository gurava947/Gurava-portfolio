string_number = input()
if (string_number[:3] == "NXT") and ((int(string_number[3:]) % 2 == 0) or (int(string_number[3:]) % 7 == 0)):
    print("Special String")
else:
    print("Not a Special String")
