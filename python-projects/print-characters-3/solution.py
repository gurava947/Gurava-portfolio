def PrintCharacters():
    S = int(input())
    word = ""
    for i in range(S):
        Number = int(input())
        word += chr(Number)
    print(word)
PrintCharacters()
