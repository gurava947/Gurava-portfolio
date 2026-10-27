M,N = int(input()),int(input())
count = 0
string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,M+1):
    for j in range(1,N+1):
        if (i == 1 or i == M or j == 1 or j == N):
            print(string[count],end=" ")
            count += 1
        else:
            print(" ",end=" ")
            count += 1
    print()
