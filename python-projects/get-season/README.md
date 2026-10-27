# Get Season

## Question

Write a program that reads a month number and prints Spring, Summer, Rainy, Autumn or Winter for months 1 to 12.

## Supplied Python code

```python
A = int(input())
if A == 2 or A == 3 :
    print("Spring")
elif A == 4 or A == 5 or A ==6:
    print("Summer")
elif A == 7 or A == 8:
    print("Rainy")
elif A == 9 or A == 10:
    print("Autumn")
elif A == 11 or A == 12 or A == 1:
    print("Winter")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Month 4 | `'4\n'` | `'Summer\n'` |
| Month 8 | `'8\n'` | `'Rainy\n'` |
| Month 10 | `'10\n'` | `'Autumn\n'` |
| Month 12 | `'12\n'` | `'Winter\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_get_season.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One month number.
- Output: A season name or empty output.
- Months outside 1–12 match no branch and print nothing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
