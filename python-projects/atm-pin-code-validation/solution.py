def validate_atm_pin_code(pin):
    for i in pin:
        is_digits = i.isdigit()
        return "Valid PIN Code" if (len(pin) == 4 and is_digits) or (len(pin) == 6 and is_digits) else "Invalid PIN Code"
pin = input()
result = validate_atm_pin_code(pin = pin)
print(result)
