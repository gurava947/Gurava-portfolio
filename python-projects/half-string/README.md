# Half String

## Question

Read a string and print the first half of it.

## Supplied Python code

```python
a = input()
aa = len(a) / 2
covert_float_to_int = int(aa)
print(a[:covert_float_to_int])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello'` | `'He\n'` |
| Python | `'Python'` | `'Pyt\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_half_string.py" -v
```

Edge cases covered:

- Empty string: stdin `'\n'`, stdout `'\n'`.
- One character: stdin `'A'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program halves the length, truncates it with int(), and slices from the start to that index. Odd lengths keep the smaller half.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
