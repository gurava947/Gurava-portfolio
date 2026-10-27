# Part of a String

## Question

Read a string and a start index, then print the string from that index onward.

## Supplied Python code

```python
a = input()
b = int(input())
c = a[b:]
print(c)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python from 2 | `'Python\n2'` | `'thon\n'` |
| Hello from 4 | `'Hello\n4'` | `'o\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_part_of_a_string.py" -v
```

Edge cases covered:

- From 0: stdin `'abc\n0'`, stdout `'abc\n'`.
- Start beyond end: stdin `'abc\n9'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program slices from the supplied index to the end of the string.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
