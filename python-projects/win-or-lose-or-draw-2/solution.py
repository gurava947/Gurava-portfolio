def compare(A, B):
    if (A > B):
        value = "Win"
    elif (A == B):
        value = "Draw"
    else:
        value = "Lose"
    return value
A = int(input())
B = int(input())
compare_result = compare(A,B)
print(compare_result)
