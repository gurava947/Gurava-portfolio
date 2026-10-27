def Armstrong_Numbers_in_inputs():
    N = int(input())
    for i in range(N):
        Inputs = input()
        power = len(Inputs)
        sum = 0
        for j in Inputs:
            arm = int(j) ** power
            sum += arm
        if (sum == int(Inputs)):
            print(Inputs)
Armstrong_Numbers_in_inputs()
