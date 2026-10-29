def get_discount(amount):
    if (500 > amount):
        return "5%"
    elif(2500 > amount):
        return "10%"
    else:
        return "20%"
amount = int(input())
total = get_discount(amount = amount)
print(total)
