S,N =int(input()),int(input())
start_number = S 
for i in range(1,N+1):
    if (i == N):
        last_row = ""
        for j in range(N):
            start_number += 1
            last_row += str(start_number) + (" ")
        print(last_row)
    elif(i == 1):
        first_row = str(start_number) + (" ")
        print(first_row)
    else:
        start_number += 1
        each_row = str(start_number) + (" ") 
        hollo_spaces = (i - 2) * ("  ")
        each_row += hollo_spaces
        start_number += 1
        each_row += str(start_number) + (" ")
        print(each_row)
