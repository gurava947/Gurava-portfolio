D,score= int(input()) ,0
if D <= 50:
    score = (D * 3)
else:
    score = (50 * 3) + (D - 50)* 5
print(score)
