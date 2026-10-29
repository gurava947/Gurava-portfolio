def get_weather_report(temperature):
    if (Number_of_tem <= 18):
        return "Cold"
    elif(Number_of_tem < 35):
        return "Warm"
    else:
        return "Hot"
Number_of_tem  = int(input())
report = get_weather_report(temperature = Number_of_tem)
print(report)
