def sum_of_cubes_m_to_n(m, n):
    cube_numbers = 0
    for i in range(m,n+1):
        cube_numbers += (i ** 3)
    print(cube_numbers)
m = int(input())
n = int(input())
sum_of_cubes_m_to_n(m,n)
