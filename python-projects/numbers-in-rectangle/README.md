# Numbers in Rectangle

## Question

Read X and Y and print X rows of Y consecutive numbers starting at 7.

## Supplied Python code

```python
def Number_of_Ractangle():
    X,Y = int(input()),int(input())
    for i in range(X):
        Start = 7
        for j in range(Y):
            print((str(Start) + " "),end="")
            Start += 1
        print()
Number_of_Ractangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 4 | `'3\n4\n'` | `'7 8 9 10 \n7 8 9 10 \n7 8 9 10 \n'` |
| X = 2, Y = 2 | `'2\n2\n'` | `'7 8 \n7 8 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_rectangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: X rows of numbers starting at 7.
- Every row restarts at 7 because the start value is assigned inside the row loop.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
