N = input()
lenth_N = len(N)-1
var1 = (str(int(N) ** 2))
lenth_of = len(var1)-1
if (int(N[lenth_N]) == int(var1[lenth_of])):
    print("Equal")
else:
    print("Not Equal")
