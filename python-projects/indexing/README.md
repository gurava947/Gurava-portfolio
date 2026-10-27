# Indexing

## Question

Read a word and an index, then print the character at that position.

## Supplied Python code

```python
W = input()
N  = int(input())
lenght_of = len(W) - 1
print(W[N])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python at 1 | `'Python\n1'` | `'y\n'` |
| Hello at 4 | `'Hello\n4'` | `'o\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_indexing.py" -v
```

Edge cases covered:

- First character: stdin `'World\n0'`, stdout `'W\n'`.
- Index out of range: raises `IndexError` (stdout `''`).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints W[N]. lenght_of is computed but never used, and it does not affect the output. The name is spelled as supplied.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
