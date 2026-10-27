# Number or Remainder

## Question

Write a program that reads a number. Print the number itself when it is a multiple of both 5 and 7 or when it is below 7; otherwise print its remainder by 5 and then its remainder by 7.

## Supplied Python code

```python
def numberOrRemainder():
    number = int(input())
    if ((number % 5 == 0 and number % 7 == 0) or (number < 7)):
        print(number)
    else:
        print(number % 5)
        print(number % 7)
numberOrRemainder()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 35 is a multiple of 5 and 7 | `'35\n'` | `'35\n'` |
| 5 is below 7 | `'5\n'` | `'5\n'` |
| 12 prints two remainders | `'12\n'` | `'2\n5\n'` |
| 8 prints two remainders | `'8\n'` | `'3\n1\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_number_or_remainder.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One line or two remainders.
- Negative numbers also satisfy number < 7, so they print themselves.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
