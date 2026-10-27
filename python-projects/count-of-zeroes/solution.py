N,count = input(),0
for i in N:
    if int(i) == 0:
        count += 1
if (3 < count):
    print("Count of zeroes is greater than three")
else:
    print("Count of zeroes is not greater than three")
