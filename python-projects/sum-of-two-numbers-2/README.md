# Sum of two numbers - 2

## Question

Read two decimal numbers and print their sum in the form Sum: value.

## Supplied Python code

```python
a = float(input())
b = float(input())
reslut = a+b
print("Sum:" , str(reslut))
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2.5 and 3.5 | `'2.5\n3.5'` | `'Sum: 6.0\n'` |
| 1 and 2 | `'1\n2'` | `'Sum: 3.0\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_two_numbers_2.py" -v
```

Edge cases covered:

- Negative sum: stdin `'-2.5\n1.0'`, stdout `'Sum: -1.5\n'`.
- Zeroes: stdin `'0\n0'`, stdout `'Sum: 0.0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program adds the two floats and prints the label Sum: followed by the result. The variable name reslut is spelled as supplied and is used consistently.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
