def get_speed_status(speed):
    if (speed <= 50):
        return "Normal"
    elif (speed >= 50) and (speed < 80):
        return "Warning"
    else:
        return "Over Speed"
speed = int(input())
speedMeter = get_speed_status(speed = speed)
print(speedMeter)
