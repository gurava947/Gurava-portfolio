def valid_string(string):
    return  "Valid String" if (len(string) >= 5)  else "Invalid String"
string = input()
result = valid_string(string = string)
print(result)
