N = input()
adding = 0
if int(N) <= 9:
    adding = N
elif int(N) <= 99:
    adding =   int(N[0])+int(N[1])
elif int(N) <= 999:
    adding =   int(N[0])+int(N[1])+int(N[2])
else:
    adding =   int(N[0])+int(N[1])+int(N[2])+int(N[3])
print(adding)
