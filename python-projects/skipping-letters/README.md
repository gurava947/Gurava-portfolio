# Skipping Letters

## Question

Read a string and an index, then print the string without the character at that index.

## Supplied Python code

```python
a = input()
b = int(input())
a1 = a[0:b] + a[b+1:]
print(a1)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python remove index 2 | `'Python\n2'` | `'Pyhon\n'` |
| Hello remove index 1 | `'Hello\n1'` | `'Hllo\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_skipping_letters.py" -v
```

Edge cases covered:

- Index 0: stdin `'abc\n0'`, stdout `'bc\n'`.
- Index beyond end: stdin `'abc\n9'`, stdout `'abc\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program concatenates the text before the index with the text after it, skipping one character.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
