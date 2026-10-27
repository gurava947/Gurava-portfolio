# Division of two numbers - 2

## Question

Read two integers, divide them, and print only the integer part.

## Supplied Python code

```python
a =int(input())
b =int(input())
content = a / b
var1 = int(content)
print(var1)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 7 divided by 2 | `'7\n2'` | `'3\n'` |
| 10 divided by 4 | `'10\n4'` | `'2\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_division_of_two_numbers_2.py" -v
```

Edge cases covered:

- Exact division: stdin `'9\n3'`, stdout `'3\n'`.
- Division by zero: raises `ZeroDivisionError` (stdout `''`).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program performs float division, converts the result with int(), and prints the truncated integer.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
