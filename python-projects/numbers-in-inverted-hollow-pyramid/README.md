# Numbers in Inverted Hollow Pyramid

## Question

Read X and Y and print X rows that form an inverted hollow pyramid numbered from Y.

## Supplied Python code

```python
def Numbers_in_Inverted_Hollow_Pyarmid():
    X,Y = int(input()),int(input())
    Number = Y
    for i in range(1,X+1):
        if (i == 1):
            row = ""
            for j in range(X):
                row += str(Number) + ' '
                Number += 1
            print(row)
        elif(i == X):
            row = ""
            left_sapces = (X-1) * (" ")
            row += left_sapces + str(Y) + " "
            print(row)
        else:
            row = ""
            left_spaces = (i-1) * (" ")
            middle_Spaces = 2*(X-i-1) *(" ")
            row += left_spaces + str(Y) + " " + middle_Spaces + str(Y + X - i)
            print(row)
Numbers_in_Inverted_Hollow_Pyarmid()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'3 4 5 \n 3 4\n  3 \n'` |
| X = 4, Y = 2 | `'4\n2\n'` | `'2 3 4 5 \n 2   4\n  2 3\n   2 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_pyramid.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: An inverted hollow numbered pyramid.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
