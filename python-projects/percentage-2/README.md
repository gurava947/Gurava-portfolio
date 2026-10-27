# Percentage - 2

## Question

Using the supplied 30 and 70 values, read an integer and print 70% of it.

## Supplied Python code

```python
x = 30
y = 70
total = x+y
n = int(input())
pasantage_of_total = (y/total) * n
print(pasantage_of_total)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 50 | `'50'` | `'35.0\n'` |
| 200 | `'200'` | `'140.0\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_percentage_2.py" -v
```

Edge cases covered:

- Zero: stdin `'0'`, stdout `'0.0\n'`.
- Negative: stdin `'-100'`, stdout `'-70.0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program computes y / total, multiplies by the input, and prints the float result. The variable name pasantage_of_total is spelled as supplied.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
