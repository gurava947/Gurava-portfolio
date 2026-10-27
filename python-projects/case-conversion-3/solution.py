N = input()
result_new_string = N[0].lower()
for i in range(1,len(N)):
    if (N[i].isupper()):
        result_new_string += "-" + N[i].lower()
    else:
        result_new_string += N[i]
print(result_new_string)
