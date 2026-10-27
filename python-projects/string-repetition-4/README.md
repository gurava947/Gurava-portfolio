# String Repetition - 4

## Question

Read a string and an integer, then print the string plus a space, repeated that many times.

## Supplied Python code

```python
a = input()
b = int(input())
c = (a+ " ")*b
print(c)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hi three times | `'Hi\n3'` | `'Hi Hi Hi \n'` |
| Go twice | `'Go\n2'` | `'Go Go \n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_string_repetition_4.py" -v
```

Edge cases covered:

- Zero repeats: stdin `'Hi\n0'`, stdout `'\n'`.
- Empty string: stdin `'\n2'`, stdout `'  \n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program appends one space to the string, repeats the combined text, and prints it. The final output therefore ends with a space.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
