L = [1, "two", 9, 5.09, "Three", -558, "four", -93.7, "six"]
#Write your code here
M,N = int(input()),int(input())
# print(L)
change_1 = L[M]
change_2 = L[N] 
# print(change_1)
# print(change_2)
L[M] = change_2
L[N] = change_1
print(L)

# swap = L[M]
# L[M] = L[N]
# L[N] = swap
# print(L)
