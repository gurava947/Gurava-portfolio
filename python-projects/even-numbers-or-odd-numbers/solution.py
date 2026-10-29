def show_numbers(number):
   for i in range(number+1):
       checking = (str(i) + ' EVEN') if (i % 2 == 0) else (str(i) + ' ODD')
       print(checking)
number = int(input())
show_numbers(number=number)
