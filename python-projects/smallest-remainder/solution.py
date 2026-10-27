A = int(input())
B = int(input())
if (A % B) > (B % A):
    print(B%A)
else:
    print(A%B)
