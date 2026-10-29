num_list = [1, 6, 32, 93, 71, -20, 30, -90, 50]
# Write your code here
New_list = []
graterthan_value = int(input())
for i in num_list:
    if (int(i) > graterthan_value):
        New_list = New_list + [i]
print(New_list)
