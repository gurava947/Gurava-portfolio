# Part of a String - 2

## Question

Read a string and two indexes, then print the characters from the first index through the second index.

## Supplied Python code

```python
a = input()
b = int(input())
c = int(input())
d = a[b:c+1]
print(d)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python 1 to 3 | `'Python\n1\n3'` | `'yth\n'` |
| Hello 0 to 1 | `'Hello\n0\n1'` | `'He\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_part_of_a_string_2.py" -v
```

Edge cases covered:

- Full range: stdin `'abc\n0\n2'`, stdout `'abc\n'`.
- Reversed range: stdin `'abc\n2\n0'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program slices from the first index through c + 1 so that the second supplied index is included.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
