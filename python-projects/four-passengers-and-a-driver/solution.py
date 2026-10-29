def number_of_cars_needed(no_of_people):
    car = (no_of_people + 4)//5
    return car
no_of_people = int(input())
OutPut = number_of_cars_needed(no_of_people)
print(OutPut)
