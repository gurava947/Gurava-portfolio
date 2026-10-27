d = input()
N = int(input())
day = 0
if d == "Sunday":
    day = 0
elif d == "Monday":
    day = 1
elif d == "Tuesday":
    day = 2
elif d == "Wednesday":
    day = 3
elif d == "Thursday":
    day = 4
elif d == "Friday":
    day = 5
elif d == "Saterday":
    day = 6
    
targeat = (day+ N -1) 
targeat = targeat % 7

if targeat == 0:
    print("Sunday")
elif targeat == 1:
    print("Monday")
elif targeat == 2:
    print("Tuesday")
elif targeat == 3:
    print("Wednesday")
elif targeat == 4:
    print("Thursday")
elif targeat == 5:
     print("Friday")
elif targeat == 6:
    print("Saterday")
