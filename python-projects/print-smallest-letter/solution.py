S = input()
smllest_number = ord(S[0])
for i in S[1:]:
     if (ord(i) < smllest_number):
         smllest_number = ord(i)
print(chr(smllest_number))
