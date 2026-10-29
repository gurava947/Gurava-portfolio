def roots_of_quadratic_equation():
    A,B,C = int(input()),int(input()),int(input())
    R1 = (-B + ((B ** 2) - (4 * A * C)) ** 0.5 )/(2 * A)
    R2 = (-B - ((B ** 2) - (4 * A * C)) ** 0.5 )/(2 * A)
    print(round(R1,2))
    print(round(R2,2))
roots_of_quadratic_equation()
