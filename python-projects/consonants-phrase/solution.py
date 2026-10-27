def consonants_Phrase():
    S,V,word = input(),"AEIOUaeiou",""
    for i in S:
        if i not in V:
           word += i
    print(word)
consonants_Phrase()
