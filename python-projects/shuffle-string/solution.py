string = input()    
def ShuffleString(string):
    New_string = ""
    for i in range(len(string)):
        No_of_inputs = int(input())
        New_string += string[No_of_inputs]
    return New_string
print(ShuffleString(string))
