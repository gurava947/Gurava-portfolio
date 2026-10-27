D,cal_score = int(input()),0
if D <= 20:
    cal_score = (D * 2)
elif D <= 40:
    cal_score = (20 * 2) + ((D - 20) * 4)
elif D <= 60:
    cal_score = (20 * 2) + (40 * 4) + ((D - 60) * 4)
else:
    cal_score = (20 * 2) + (40 * 4) + ((D - 60) * 6)
print(cal_score  + 30)
