# Divisible by 10 or 5

## Question

Write a program that reads an integer and prints "Divisible by 10" when it is a multiple of 10, "Divisible by 5" when it is a multiple of 5, otherwise "Not Divisible by 10 or 5".

## Supplied Python code

```python
N = int(input())
if (N % 10 == 0):
    print("Divisible by 10")
elif (N % 5 == 0):
    print("Divisible by 5")
else:
    print("Not Divisible by 10 or 5")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 20 is divisible by 10 | `'20\n'` | `'Divisible by 10\n'` |
| 15 is divisible by 5 | `'15\n'` | `'Divisible by 5\n'` |
| 7 is divisible by neither | `'7\n'` | `'Not Divisible by 10 or 5\n'` |
| 0 is divisible by 10 | `'0\n'` | `'Divisible by 10\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_10_or_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One of three divisibility messages.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
