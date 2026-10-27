# String Repetition - 2

## Question

Read a string and an integer, then print the string repeated that many times.

## Supplied Python code

```python
a =input()
b =int(input())
c = a * b
print(c)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hi times 3 | `'Hi\n3'` | `'HiHiHi\n'` |
| ab times 0 | `'ab\n0'` | `'\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_string_repetition_2.py" -v
```

Edge cases covered:

- Negative count: stdin `'Hi\n-1'`, stdout `'\n'`.
- Empty string: stdin `'\n2'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program uses string repetition with * and prints the joined copies on one line.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
