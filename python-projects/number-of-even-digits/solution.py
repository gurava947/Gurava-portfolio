Evan = input()
EvanCount = 0
def NumberOFEvanDigits(Evan,EvanCount):
    for i in Evan:
        if (int(i) % 2 == 0):
            EvanCount += 1
    if (EvanCount > 2):
        satues = "Count of even digits is greater than two"
    else:
        satues = "Count of even digits is not greater than two"
    print(satues)
NumberOFEvanDigits(Evan,EvanCount)
