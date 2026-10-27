# Kilometers to Meters

## Question

Read a distance in kilometers and print the equivalent whole number of metres.

## Supplied Python code

```python
b = float(input())
c = b*1000
d = int(c)
print(d)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1.5 km | `'1.5'` | `'1500\n'` |
| 2.75 km | `'2.75'` | `'2750\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_kilometers_to_meters.py" -v
```

Edge cases covered:

- Zero km: stdin `'0'`, stdout `'0\n'`.
- Fractional metres truncated: stdin `'0.0009'`, stdout `'0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program multiplies the float kilometre value by 1000 and converts the result to int before printing.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
