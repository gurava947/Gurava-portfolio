T = float(input())
if 0 > T:
    print("Freezing weather")
elif 10 > T:
    print("Very Cold weather")
elif 20 > T:
    print("Cold weather")
elif 30 > T:
    print("Normal")
elif 40 > T:
    print("Hot")
else:
    print("Very Hot")
