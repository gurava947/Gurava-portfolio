# Years, Weeks & Days

## Question

Write a program that reads a number of days and prints the equivalent years, weeks and days on three lines, using 365-day years and 7-day weeks.

## Supplied Python code

```python
N = int(input())
print(int(N / 365))
print(int(((N) - (int(N / 365) * 365)) / 7))
print(N - (((int(N / 365)) * 365)  + (int(((N) - (int(N / 365) * 365)) / 7)) * 7))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 400 days | `'400\n'` | `'1\n5\n0\n'` |
| 1000 days | `'1000\n'` | `'2\n38\n4\n'` |
| 14 days | `'14\n'` | `'0\n2\n0\n'` |
| 10 days | `'10\n'` | `'0\n1\n3\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_years_weeks_and_days.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer number of days.
- Output: Years, weeks and days on three lines.
- The code uses 365-day years, so leap days are ignored.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
