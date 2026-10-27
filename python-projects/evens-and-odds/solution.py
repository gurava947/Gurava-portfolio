def Evens_and_odd():
    M,N = int(input()),int(input())
    count_odd,count_even = 0,0
    for i in range(M,N+1):
        if (i % 2 == 1):
            count_odd += 1
        else:
            count_even += 1
    print(count_odd)
    print(count_even)
Evens_and_odd()
