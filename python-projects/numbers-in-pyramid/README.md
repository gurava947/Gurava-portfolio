# Numbers in Pyramid

## Question

Read X and Y and print a Y-row pyramid whose right edge starts at X and grows by one per row.

## Supplied Python code

```python
def Number_in_Pyramid():
    X,Y = int(input()),int(input())
    for i in range(1,Y+1):
        spaces = (Y-i) * (" ")
        row = ""
        X_count = X
        for j in range(i):
            row += str(X_count) + " "
            X_count += 1
        print(spaces+row)
Number_in_Pyramid()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'  3 \n 3 4 \n3 4 5 \n'` |
| X = 5, Y = 4 | `'5\n4\n'` | `'   5 \n  5 6 \n 5 6 7 \n5 6 7 8 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_pyramid.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A pyramid of consecutive numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
