# First Part of a String

## Question

Read a string and print its first part, ending before index 2.

## Supplied Python code

```python
a = input()
print(a[:2])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'Py\n'` |
| Hi | `'Hi'` | `'Hi\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_part_of_a_string.py" -v
```

Edge cases covered:

- Empty string: stdin `'\n'`, stdout `'\n'`.
- One character: stdin `'A'`, stdout `'A\n'`.

## Source preservation

The supplied snippet was `print(a[2:])`, the same body as Second Part of a String. The only change is `print(a[:2])`, chosen to match the title. No other formatting or naming changes were made. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints a[:2], which keeps the first two characters.
- Correction: the supplied body was print(a[2:]), identical to Second Part of a String. The body is now print(a[:2]), the smallest change that matches the title while keeping the supplied index 2.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
