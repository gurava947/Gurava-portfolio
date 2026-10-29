S,New  = input(),""
split_method = S.split()
for i in split_method:
    one_new = i
    New += (one_new[2]) + ","
print(New[:len(New)-1])
