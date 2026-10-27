# Sum of the digits

## Question

Read a three-digit number as text and print the sum of its three digits.

## Supplied Python code

```python
a = input()
b1 = a[0]
c1 = a[1]
d1 = a[2]
b = int(b1)
c = int(c1)
d = int(d1)
total = b+c+d
print(total)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 123 | `'123'` | `'6\n'` |
| 907 | `'907'` | `'16\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_the_digits.py" -v
```

Edge cases covered:

- 000: stdin `'000'`, stdout `'0\n'`.
- Two digits: raises `IndexError` (stdout `''`).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program takes the first three characters, converts each to int, adds them, and prints the total.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
