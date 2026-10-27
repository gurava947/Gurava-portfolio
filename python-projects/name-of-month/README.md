# Name of Month

## Question

Write a program that reads a month number and prints the matching month name, or "Invalid Month Number" outside 1 to 12.

## Supplied Python code

```python
A = int(input())
months = [
"January","February",
"March","April","May",
"June","July","August"
,"September","October"
,"November","December"]

if 1 <= A <= 12:
    print(months[A - 1])
else:
    print("Invalid Month Number")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Month 1 | `'1\n'` | `'January\n'` |
| Month 6 | `'6\n'` | `'June\n'` |
| Month 12 | `'12\n'` | `'December\n'` |
| Month 13 | `'13\n'` | `'Invalid Month Number\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_name_of_month.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: A month name or an error message.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
