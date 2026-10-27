N = int(input())
def HellowSpaces(N):
    for i in range(N+2):
        if (i == 0 or i == N+1):
            print("+ " + N * ("- ") + "+ ")
        else:
            print("| " + (N * 2) * (" ") + "| ")
HellowSpaces(N)
