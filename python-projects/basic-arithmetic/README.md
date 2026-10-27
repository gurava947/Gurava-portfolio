# Basic Arithmetic

## Question

Read two integers and print their sum, difference, and product on separate lines.

## Supplied Python code

```python
a0 = int(input())
a1 = int(input())
print(a0+a1)
print(a0-a1)
print(a0*a1)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 and 3 | `'5\n3'` | `'8\n2\n15\n'` |
| 10 and 4 | `'10\n4'` | `'14\n6\n40\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_basic_arithmetic.py" -v
```

Edge cases covered:

- Negative numbers: stdin `'-2\n7'`, stdout `'5\n-9\n-14\n'`.
- Zeroes: stdin `'0\n0'`, stdout `'0\n0\n0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints a0 + a1, a0 - a1, and a0 * a1 in that order.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
