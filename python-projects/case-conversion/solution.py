def case_conversion():
    S = input()
    New_word = S[0].lower()
    for i in range(1,len(S)):
        if S[i].isupper():
            New_word += "_" + S[i].lower()
        else:
            New_word += S[i]
    print(New_word)
case_conversion()
