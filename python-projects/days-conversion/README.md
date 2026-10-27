# Days Conversion

## Question

Write a program that reads a number of days and prints the equivalent years, weeks and days in one labelled line.

## Supplied Python code

```python
N = int(input())

year = N // 365

remaing_days = N % 365

weeks = remaing_days // 7 

days = remaing_days % 7
print(F"{year} years {weeks} weeks {days} days")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 400 days | `'400\n'` | `'1 years 5 weeks 0 days\n'` |
| 1000 days | `'1000\n'` | `'2 years 38 weeks 4 days\n'` |
| 0 days | `'0\n'` | `'0 years 0 weeks 0 days\n'` |
| 14 days | `'14\n'` | `'0 years 2 weeks 0 days\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_days_conversion.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer number of days.
- Output: One labelled line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
