# Sum of Squares

## Question

Write a program that reads two integers A and B and prints "Greater than or Equal to 60" when A ** 2 + B ** 2 is greater than 60, otherwise "Less than 60".

## Supplied Python code

```python
A = int(input())
B = int(input())
if (A ** 2 + B ** 2 > 60):
    print("Greater than or Equal to 60")
else:
    print("Less than 60")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 6 and 6 give 72 | `'6\n6\n'` | `'Greater than or Equal to 60\n'` |
| 5 and 5 give 50 | `'5\n5\n'` | `'Less than 60\n'` |
| 1 and 1 give 2 | `'1\n1\n'` | `'Less than 60\n'` |
| 8 and 3 give 73 | `'8\n3\n'` | `'Greater than or Equal to 60\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_squares.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One of two comparison messages.
- A sum of exactly 60 would print "Less than 60" because the code uses > 60.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
