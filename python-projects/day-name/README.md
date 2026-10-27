# Day Name

## Question

Write a program that reads a day number from 1 to 7 and prints the matching weekday name.

## Supplied Python code

```python
Day = int(input())
if (Day == 1):
    print("Monday")
elif (Day == 2):
    print("Tuesday")
elif (Day == 3):
    print("Wednesday")
elif (Day == 4):
    print("Thursday")
elif (Day == 5):
    print("Friday")
elif (Day == 6):
    print("Saturday")
elif (Day == 7):
    print("Sunday")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Day 1 | `'1\n'` | `'Monday\n'` |
| Day 3 | `'3\n'` | `'Wednesday\n'` |
| Day 7 | `'7\n'` | `'Sunday\n'` |
| Day 8 | `'8\n'` | `''` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_day_name.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer day number.
- Output: A weekday name or empty output.
- Values outside 1–7 print nothing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
