# Not divisible by Numbers

## Question

Write a program that reads a number and prints True when it is not divisible by 2, 3, 5 or 7, otherwise False.

## Supplied Python code

```python
def divisible():
    number = int(input())
    if ((number % 2 != 0) and (number % 3 != 0) and (number % 5 != 0) and (number % 7 != 0)):
        print(True)
    else:
        print(False)
divisible()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 11 is not divisible by 2, 3, 5 or 7 | `'11\n'` | `'True\n'` |
| 105 is divisible by 7 | `'105\n'` | `'False\n'` |
| 2 is divisible by 2 | `'2\n'` | `'False\n'` |
| 1 is not divisible by any | `'1\n'` | `'True\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_not_divisible_by_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: True or False.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
