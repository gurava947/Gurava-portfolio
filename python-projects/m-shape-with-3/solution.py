N = int(input())
for i in range(1,N+1):
    print((N-i)*(". "),end="")
    for j in range(i * 2 - 1):
        print("0 ",end="")
    print(2*(N-i)*(". "),end="")
    for Z in range(i * 2 - 1):
        print("0 ",end="")
    print((N-i)*(". "))
