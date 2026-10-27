def divisible():
    number = int(input())
    if ((number % 2 != 0) and (number % 3 != 0) and (number % 5 != 0) and (number % 7 != 0)):
        print(True)
    else:
        print(False)
divisible()
