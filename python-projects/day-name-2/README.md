# Day Name - 2

## Question

Write a program that reads a starting weekday name and a day count N, then prints the resulting weekday.

## Supplied Python code

```python
d = input()
N = int(input())
day = 0
if d == "Sunday":
    day = 0
elif d == "Monday":
    day = 1
elif d == "Tuesday":
    day = 2
elif d == "Wednesday":
    day = 3
elif d == "Thursday":
    day = 4
elif d == "Friday":
    day = 5
elif d == "Saterday":
    day = 6
    
targeat = (day+ N -1) 
targeat = targeat % 7

if targeat == 0:
    print("Sunday")
elif targeat == 1:
    print("Monday")
elif targeat == 2:
    print("Tuesday")
elif targeat == 3:
    print("Wednesday")
elif targeat == 4:
    print("Thursday")
elif targeat == 5:
     print("Friday")
elif targeat == 6:
    print("Saterday")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Sunday plus 1 | `'Sunday\n1\n'` | `'Sunday\n'` |
| Monday plus 3 | `'Monday\n3\n'` | `'Wednesday\n'` |
| Saterday plus 2 | `'Saterday\n2\n'` | `'Sunday\n'` |
| Friday plus 0 | `'Friday\n0\n'` | `'Thursday\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_day_name_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A weekday name, then an integer offset.
- Output: A weekday name.
- The supplied code spells Saturday as Saterday, so "Saturday" is not recognised and falls back to Sunday.
- N = 1 keeps the starting day; N = 0 returns the previous day.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
