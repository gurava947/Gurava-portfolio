def numberOrRemainder():
    number = int(input())
    if ((number % 5 == 0 and number % 7 == 0) or (number < 7)):
        print(number)
    else:
        print(number % 5)
        print(number % 7)
numberOrRemainder()
