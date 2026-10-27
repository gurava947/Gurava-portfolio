import sys
X,Y = int(sys.stdin.readline()),int(sys.stdin.readline())
print('\n'.join(
    ('*' * X) if i % 2 == 0 else ("-" * X)
    for i in range(1,X+1)
    ))
