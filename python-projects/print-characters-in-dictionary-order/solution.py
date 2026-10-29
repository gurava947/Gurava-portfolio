S = input()
li = []
for i in S:
    convart = ord(i)
    li.append(convart)
print(str(chr(min(li))) + " " + str(chr(max(li))))
