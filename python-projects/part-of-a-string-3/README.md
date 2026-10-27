# Part of a String - 3

## Question

Read a string and print the part between the first two and last two characters.

## Supplied Python code

```python
a = input()
print(a[2:len(a)-2])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'th\n'` |
| Hello | `'Hello'` | `'l\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_part_of_a_string_3.py" -v
```

Edge cases covered:

- Four-character word: stdin `'Word'`, stdout `'\n'`.
- Three-character word: stdin `'abc'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program slices from index 2 up to len(a) - 2, dropping two characters from both ends.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
