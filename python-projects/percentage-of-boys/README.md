# Percentage of Boys

## Question

Read the percentage of girls in a class and print the percentage of boys.

## Supplied Python code

```python
a = int(input())
b = 100 - a
print(b)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 40 percent girls | `'40'` | `'60\n'` |
| 25 percent girls | `'25'` | `'75\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_percentage_of_boys.py" -v
```

Edge cases covered:

- All girls: stdin `'100'`, stdout `'0\n'`.
- All boys: stdin `'0'`, stdout `'100\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program subtracts the supplied percentage from 100 and prints the remainder.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
