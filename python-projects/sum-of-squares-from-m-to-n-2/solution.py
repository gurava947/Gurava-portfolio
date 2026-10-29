def sum_of_squares_m_to_n(m, n,total):
    for i in range(m,n+1):
        total += (i ** 2)
    return total
m = int(input())
n = int(input())
total = 0
result = sum_of_squares_m_to_n(m,n,total)
print(result)
