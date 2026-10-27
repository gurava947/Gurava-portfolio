# Last N characters

## Question

Read a string and an integer N, then print the last N characters.

## Supplied Python code

```python
a =input()
b =int(input())
c =len(a)
f = c-b
print(a[f:])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python last 3 | `'Python\n3'` | `'hon\n'` |
| Hello last 2 | `'Hello\n2'` | `'lo\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_last_n_characters.py" -v
```

Edge cases covered:

- N larger than string: stdin `'Hi\n5'`, stdout `'Hi\n'`.
- N zero: stdin `'Hi\n0'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program subtracts N from the length and slices from that index to the end.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
