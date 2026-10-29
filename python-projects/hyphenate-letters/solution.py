N = input()
new_string = N[0]
for i in range(1,len(N)):
    if (N[i].islower()) or (N[i].isupper()):
        new_string += "-" + N[i]
    else:
        new_string += N[i]
print(new_string)
