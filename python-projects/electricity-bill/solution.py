U, bill = int(input()), 0
if (U <= 50):
    bill = U * 2
elif (U <= 150):
    bill = (50 * 2) + (U - 50)*3
elif (U <= 250):
    bill = (50 * 2) + (100 * 3) + (U - 150)*5
else:
    bill = (50 * 2) + (100 * 3) + (100 * 5) + (U - 250)*8
Char_of_20_persentage = bill * 0.2 + bill
print(Char_of_20_persentage)
