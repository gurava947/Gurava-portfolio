# Remainder

## Question

Read two integers and print the remainder when the first is divided by the second.

## Supplied Python code

```python
a =  int(input())
b = int(input())
result  = a % b
print(result)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 10 modulo 3 | `'10\n3'` | `'1\n'` |
| 17 modulo 5 | `'17\n5'` | `'2\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_remainder.py" -v
```

Edge cases covered:

- Exact division: stdin `'9\n3'`, stdout `'0\n'`.
- Zero divisor: raises `ZeroDivisionError` (stdout `''`).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program applies the % operator and prints the remainder.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
