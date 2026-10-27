N = int(input())
for i in range(1,N+1):
    star = ((N*2) - i-(i-1)) * "* "
    spaces = ((i*2)-2) * ("  ")
    print(spaces + star)
