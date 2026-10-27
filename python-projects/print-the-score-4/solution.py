D,score,boues = int(input()),0,50
if (D <= 40):
    score = (D * 2)
elif (D <= 60):
    score = (40 * 2) + (D - 40)* 4
elif ((D <= 120)):
    score = (40 * 2) + (20 * 4) + (D - 60)*6
else:
    score = (40 * 2) + (20 * 4) + (60 * 6) + (D - 120)*8
print(score + boues)
