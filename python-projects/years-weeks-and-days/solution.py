N = int(input())
print(int(N / 365))
print(int(((N) - (int(N / 365) * 365)) / 7))
print(N - (((int(N / 365)) * 365)  + (int(((N) - (int(N / 365) * 365)) / 7)) * 7))
