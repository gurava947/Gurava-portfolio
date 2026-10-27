# Shape

## Question

Read an integer N and print three rows, each containing N copies of '+ '.

## Supplied Python code

```python
name = int(input());stars = "+ " * name
print(stars);print(stars);print(stars)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Three plus signs | `'3'` | `'+ + + \n+ + + \n+ + + \n'` |
| One plus sign | `'1'` | `'+ \n+ \n+ \n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_shape.py" -v
```

Edge cases covered:

- Zero: stdin `'0'`, stdout `'\n\n\n'`.
- Negative: stdin `'-1'`, stdout `'\n\n\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program uses semicolons to read the count, build the repeated string once, and print it three times. Each line ends with a space.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
