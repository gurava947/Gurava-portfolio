# Numbers in Hollow Rectangle - 2

## Question

Read M and N and print a hollow rectangle whose border cells carry consecutive numbers starting at 1.

## Supplied Python code

```python
M,N = int(input()),int(input())
Count = 1
for i in range(1,M+1):
    for j in range(1,N+1):
        if (i == 1 or i == M or j == 1 or j == N):
            print(Count,end=" ")
            Count += 1
        else:
            print(" ",end=" ")
            Count += 1
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 3, N = 4 | `'3\n4\n'` | `'1 2 3 4 \n5     8 \n9 10 11 12 \n'` |
| M = 4, N = 3 | `'4\n3\n'` | `'1 2 3 \n4   6 \n7   9 \n10 11 12 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_rectangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: A hollow numbered rectangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
