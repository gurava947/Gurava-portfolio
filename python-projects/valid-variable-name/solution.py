S = input()
count = 0
for i in S:
    if (i.islower() or i.isupper()):
        continue
    elif(i == " " or i == "_" or i.isalnum() or i == "%"):
        count += 1
if (count == 1):
    print(False)
else:
    print(True)
