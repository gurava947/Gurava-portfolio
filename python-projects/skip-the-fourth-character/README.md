# Skip the Fourth Character

## Question

Read a string and print it without the fourth character.

## Supplied Python code

```python
a = input()
b = a[0:3] + a[4:]
print(b)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'Pyton\n'` |
| abcdef | `'abcdef'` | `'abcef\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_skip_the_fourth_character.py" -v
```

Edge cases covered:

- Three-character word: stdin `'abc'`, stdout `'abc\n'`.
- Empty string: stdin `'\n'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program joins the first three characters with everything after index 3, skipping index 3.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
