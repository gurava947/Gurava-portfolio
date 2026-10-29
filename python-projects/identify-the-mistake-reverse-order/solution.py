list_a = input().split(",")
list_b = input().split(",")


lenth_of_a = len(list_a)
for i in range(lenth_of_a):
    num1 = list_a[i]
    num2 = list_b[lenth_of_a - 1 - i]
    values = num1 + " " + num2
    print(values)
