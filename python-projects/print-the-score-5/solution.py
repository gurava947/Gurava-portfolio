D,score = int(input()),0
if (D <= 50):
    score = (D * 3)
elif (D <= 100):
    score = (50 * 3) + ((D - 50) * 5)
elif (D <= 200):
    score = (50 * 3) + (50 * 5) + ((D - 100) * 6)
else:
    score = (50 * 3) + (50 * 5) + (100 * 6)+ ((D - 200) * 10)
print(100 + score)
