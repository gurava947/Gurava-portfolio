N = int(input())

year = N // 365

remaing_days = N % 365

weeks = remaing_days // 7 

days = remaing_days % 7
print(F"{year} years {weeks} weeks {days} days")
