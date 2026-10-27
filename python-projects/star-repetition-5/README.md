# Star Repetition - 5

## Question

Read a first name and a last name, then print stars matching the last name's length followed by the remaining part of the first name.

## Supplied Python code

```python
FistName,LastName = input(),input()
print("*" *len(LastName)  +FistName[len(LastName) : ])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Gurava Rao | `'Gurava\nRao'` | `'***ava\n'` |
| Python P | `'Python\nP'` | `'*ython\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_star_repetition_5.py" -v
```

Edge cases covered:

- Last name longer than first: stdin `'Al\nReddy'`, stdout `'*****\n'`.
- Empty last name: stdin `'Gurava\n\n'`, stdout `'Gurava\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints len(LastName) stars and then FirstName from that same index onward. The variable FistName is spelled as supplied and used consistently.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
