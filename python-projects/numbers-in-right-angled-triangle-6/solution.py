N = int(input())
for row in range(1,N+1):
    each__row = ""
    for colums  in range(1,row+1):
        each__row = each__row + str(colums) + " "
    for colums in range(1,row):
        each__row = each__row + str(colums) + " "
    print(each__row)
