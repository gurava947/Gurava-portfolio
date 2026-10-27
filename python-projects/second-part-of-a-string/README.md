# Second Part of a String

## Question

Read a string and print its second part, starting at index 2.

## Supplied Python code

```python
a = input()
print(a[2:])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'thon\n'` |
| ab | `'ab'` | `'\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_second_part_of_a_string.py" -v
```

Edge cases covered:

- Empty string: stdin `'\n'`, stdout `'\n'`.
- One character: stdin `'A'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints a[2:], which drops the first two characters.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
