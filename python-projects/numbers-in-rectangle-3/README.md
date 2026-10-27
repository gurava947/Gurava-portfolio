# Numbers in Rectangle - 3

## Question

Read X and Y and print X rows of Y numbers counting down from X*Y.

## Supplied Python code

```python
def Number_in_ractangle():
    X,Y = int(input()),int(input())
    Number = (X*Y)
    for i in range(X):
        row = ""
        for j in range(Y):
            row += (str(Number) + " ")
            Number -= 1
        print(row)
Number_in_ractangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'9 8 7 \n6 5 4 \n3 2 1 \n'` |
| X = 2, Y = 4 | `'2\n4\n'` | `'8 7 6 5 \n4 3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_rectangle_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A descending rectangle of numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
