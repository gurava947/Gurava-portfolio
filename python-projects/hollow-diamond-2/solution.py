n = int(input())
alpha = 65
for row in range(n):
    left_spaces = " " * (n - row - 1) 
    hollow_spaces = " " * (2 * row - 1)
    if row == 0:
        each_row = left_spaces + chr(alpha)
        alpha += 1
    else:
        each_row = left_spaces + chr(alpha) + hollow_spaces + chr(alpha)
        alpha += 1
    print(each_row)
    
alpha -= 2

for row in range(1, n):
    left_spaces = " " * row 
    hollow_spaces = " " * (2 * (n - row - 1) - 1)
    if row == n - 1:
        each_row = left_spaces + chr(alpha)
    else:
        each_row = left_spaces + chr(alpha) + hollow_spaces + chr(alpha)
        alpha -= 1 
    print(each_row)
