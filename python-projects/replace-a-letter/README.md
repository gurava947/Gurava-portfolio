# Replace a Letter

## Question

Read a string, an index, and a replacement character, then print the string with that index replaced.

## Supplied Python code

```python
W,I,C = input(),int(input()),input()
print(W[:I] + C + W[I+1:])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python index 2 X | `'Python\n2\nX'` | `'PyXhon\n'` |
| Hello index 0 J | `'Hello\n0\nJ'` | `'Jello\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_replace_a_letter.py" -v
```

Edge cases covered:

- Last index: stdin `'abc\n2\nZ'`, stdout `'abZ\n'`.
- Index beyond end: stdin `'abc\n9\nZ'`, stdout `'abcZ\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program joins the text before index I, the replacement character, and the text after index I.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
