# First Three Characters

## Question

Read a string and print its first three characters.

## Supplied Python code

```python
a =input()
print(a[0:3])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'Pyt\n'` |
| Hi | `'Hi'` | `'Hi\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_three_characters.py" -v
```

Edge cases covered:

- Empty string: stdin `'\n'`, stdout `'\n'`.
- Unicode: stdin `'ಗುರು'`, stdout `'ಗುರ\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program slices the input from index 0 up to, but not including, index 3.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
