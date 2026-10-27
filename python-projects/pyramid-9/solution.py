N = int(input())
for i in range(1,N+1):
    print((N-i)*(". "),end="")
    row = ""
    for j in range(1,i*2):
        print("0",end=" ")
    print((N-i)*(". "),end="")
    print()
