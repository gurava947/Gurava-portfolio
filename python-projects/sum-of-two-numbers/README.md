# Sum of two numbers

## Question

Read two integers and print their sum.

## Supplied Python code

```python
a,b = int(input()),int(input())
sum = a + b
print(sum)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2 and 3 | `'2\n3'` | `'5\n'` |
| 10 and 20 | `'10\n20'` | `'30\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_two_numbers.py" -v
```

Edge cases covered:

- Negative numbers: stdin `'-4\n7'`, stdout `'3\n'`.
- Zeroes: stdin `'0\n0'`, stdout `'0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program reads two integers with input(), stores their total in sum, and prints it on one line.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
