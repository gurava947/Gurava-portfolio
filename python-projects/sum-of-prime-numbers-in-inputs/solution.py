N,adding_values = int(input()),0
for numbers in range(N):
    number_of_inputs = int(input())
    factores = 0
    for i in range(1,number_of_inputs+1):
        if (number_of_inputs % i == 0):
            factores += 1
    if (factores == 2):
        adding_values += number_of_inputs
print(adding_values)
