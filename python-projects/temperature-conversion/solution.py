temp_input = input()

value = float(temp_input[:-1])
unit = temp_input[-1].upper()

if unit == "C":
    celsius = value
    fahreheit = (value * 9/5) + 32
    kelvin = value + 273 
elif unit == "F":
    celsius = (value - 32) * 5/9
    fahreheit = value
    kelvin = celsius + 273
elif unit == "K":
    celsius = value - 273 
    fahreheit = (celsius * 9/5) + 32
    kelvin = value
print(str(round(celsius,2)) + "C")
print(str(round(fahreheit,2)) + "F")
print(str(round(kelvin,2)) + "K")
