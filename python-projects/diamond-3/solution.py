N = int(input())
for i in range(1,N+1):
    print((N-i)*(". "),end="")
    for j in range(1,i*2):
        print("0 ",end="")
    print((N-i)*(". "),end="")
    print()
for Z in range(1,N):
    print((Z)*(". "),end="")
    for K in range(1,(N-Z)*2):
        print("0 ",end="")
    print((Z)*(". "),end="")
    print()
