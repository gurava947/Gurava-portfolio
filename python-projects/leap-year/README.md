# Leap Year

## Question

Write a program that reads a year and prints True when it is a leap year, otherwise False.

## Supplied Python code

```python
Y = int(input())

if (Y % 4 == 0):
    if (Y % 100 == 0):
        print(False)
    else:
        print(True)
else:
    print(False)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2024 is a leap year | `'2024\n'` | `'True\n'` |
| 2023 is not a leap year | `'2023\n'` | `'False\n'` |
| 2000 is reported as not leap | `'2000\n'` | `'False\n'` |
| 1900 is not a leap year | `'1900\n'` | `'False\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_leap_year.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One year.
- Output: True or False.
- The supplied code has no 400-year rule, so century leap years such as 2000 print False.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
