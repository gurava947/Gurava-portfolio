A,B = int(input()),int(input())
if (0 < A) and (0 < B):
    if A < B:
        print(B - A)
    else:
        print(A - B)
elif (0 > A) and (0 > B):
    if A < B:
        print(-1 * (A - B))
    else:
        print((-1) * (B - A))
else:
    print(-1 * (-A +(B)))
