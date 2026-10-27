def Triplest_Of_number():
    N = int(input())
    Triplest_number = 0
    trip = ""
    for i in range(1,N+1):
        for j in range(i+1,N+1):
            for z in range(j+1,N+1):
                if (i+j+z == N):
                    Triplest_number += 1
                    trip += "(" + str(i) + "," + str(j) + "," + str(z) + ")" + "\n"
    print(Triplest_number)
    # print(trip)
Triplest_Of_number()
