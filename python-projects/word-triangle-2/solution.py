def wordTriangle():
    word = input()
    for i in range(len(word)):
        print(word[:len(word)-i])
wordTriangle()
