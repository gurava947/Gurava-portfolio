def countOf_lowerAndupper(S):
    upper,lower = 0, 0
    for i in S:
        if i.isupper():
            upper += 1
        elif i.islower():
            lower += 1
    print(upper)
    print(lower)
S = input()
countOf_lowerAndupper(S)
