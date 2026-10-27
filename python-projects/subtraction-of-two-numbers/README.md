# Subtraction of two numbers

## Question

Read two decimal numbers and print the first minus the second.

## Supplied Python code

```python
a = float(input())
b = float(input())
print(a-b)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5.5 minus 2.5 | `'5.5\n2.5'` | `'3.0\n'` |
| 10.0 minus 4.5 | `'10.0\n4.5'` | `'5.5\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_subtraction_of_two_numbers.py" -v
```

Edge cases covered:

- Negative result: stdin `'2.0\n5.0'`, stdout `'-3.0\n'`.
- Integers accepted as floats: stdin `'10\n3'`, stdout `'7.0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program converts both inputs with float() and prints the first value minus the second.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
