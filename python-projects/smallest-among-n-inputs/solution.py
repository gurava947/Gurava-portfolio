N = int(input())
smllest_number = 99999
for i in range(N-1):
    num = int(input())
    if (smllest_number > num):
        smllest_number = num
        print(num)
