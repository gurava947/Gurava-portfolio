# Hollow Inverted Half Pyramid - 2

## Question

Read N and print an inverted pyramid whose first row is 1 to N and whose interior rows show 1 and N-i+1.

## Supplied Python code

```python
def Hollow_spaces_inverted_half_Pyramid():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            for i in range(N):
                row += str(i+1) + " "
            print(row)
        elif(i == N):
            print(1,end=" ")
        else:
            row = ""
            middelSpaces = (N-i-1) *("  ")
            row += "1 " + middelSpaces + str(N-i+1)
            print(row)
Hollow_spaces_inverted_half_Pyramid()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 2 3 4 \n1   3\n1 2\n1 '` |
| N = 3 | `'3\n'` | `'1 2 3 \n1 2\n1 '` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_inverted_half_pyramid_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow inverted number pyramid.
- The bottom rows print without a trailing space, unlike the top row.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
