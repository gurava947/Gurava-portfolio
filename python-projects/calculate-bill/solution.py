def calculateBill(value):
    if (value < 500):
        cost = (value - (value * 0.05))
    elif (500 <= value < 2500):
        cost = (value - (value * 0.1))
    else:
        cost = (value - (value * 0.2))
    return round(cost,3)
value = int(input())
Total = calculateBill(value)
print(Total)
