# Stars - 3

## Question

Read an integer N and print three rows, each containing N copies of '* '.

## Supplied Python code

```python
a = int(input())
print("* " *a)
print("* " *a)
print("* " *a)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Three stars | `'3'` | `'* * * \n* * * \n* * * \n'` |
| One star | `'1'` | `'* \n* \n* \n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_stars_3.py" -v
```

Edge cases covered:

- Zero: stdin `'0'`, stdout `'\n\n\n'`.
- Negative: stdin `'-1'`, stdout `'\n\n\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program reads one integer and prints the repeated string '* ' three times. Each line ends with a space.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
