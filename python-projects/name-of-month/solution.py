A = int(input())
months = [
"January","February",
"March","April","May",
"June","July","August"
,"September","October"
,"November","December"]

if 1 <= A <= 12:
    print(months[A - 1])
else:
    print("Invalid Month Number")
