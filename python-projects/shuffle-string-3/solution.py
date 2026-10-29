def shiff_string(S,N):
    New = ""
    for i in N:
        New += (S[int(i)])
    print(New)
S = input()
N = input().split(" ")
shiff_string(S,N)
