# Simple Triangle - 4

## Question

Print a three-row triangle made of + characters.

## Supplied Python code

```python
print("+")
print("+" *2)
print("+" *3)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| No input | `''` | `'+\n++\n+++\n'` |

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_simple_triangle_4.py" -v
```

Edge cases covered:

- Extra stdin ignored: stdin `'ignored\n'`, stdout `'+\n++\n+++\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints one, two, and three plus signs on consecutive lines. It reads no input.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
