import sys 
M,N = int(sys.stdin.readline()),int(sys.stdin.readline())
print("\n".join(
    (("+" + str(N * "-") + "+ ") if (i == 1 or i == M+2) else ("| ") + str((N-1) * " ") + "| ")
    for i in range(1,M+3)
    ))
