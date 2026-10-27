# Week Day

## Question

Write a program that reads a day number and prints Week Start for 1–2, Midweek for 3–5, and Weekend for 6–7.

## Supplied Python code

```python
W = int(input())
if (W <= 2):
    print("Week Start")
elif (W <= 5):
    print("Midweek")
elif (W <= 7):
    print("Weekend")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Day 1 | `'1\n'` | `'Week Start\n'` |
| Day 4 | `'4\n'` | `'Midweek\n'` |
| Day 6 | `'6\n'` | `'Weekend\n'` |
| Day 9 | `'9\n'` | `''` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_week_day.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer day number.
- Output: A segment name or empty output.
- Values above 7 print nothing.
- Values below 1, such as 0, print Week Start because the first branch is W <= 2.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
