# String Repetition 3

## Question

Read a string and an integer, then print its last three characters repeated that many times.

## Supplied Python code

```python
a = input()
a1 = int(input())
print(a[-3:] * a1)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python twice | `'Python\n2'` | `'honhon\n'` |
| Hello once | `'Hello\n1'` | `'llo\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_string_repetition_3.py" -v
```

Edge cases covered:

- Zero repeats: stdin `'Python\n0'`, stdout `'\n'`.
- Empty string: stdin `'\n3'`, stdout `'\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program slices the last three characters with a[-3:] and repeats that slice.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
