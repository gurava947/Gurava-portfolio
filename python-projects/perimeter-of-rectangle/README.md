# Perimeter of Rectangle

## Question

Read the length and breadth of a rectangle and print its perimeter.

## Supplied Python code

```python
a = int(input())
a1 = int(input())
print(2 * (a+a1))
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4 by 5 | `'4\n5'` | `'18\n'` |
| 10 by 2 | `'10\n2'` | `'24\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_perimeter_of_rectangle.py" -v
```

Edge cases covered:

- Negative side: stdin `'-1\n5'`, stdout `'8\n'`.
- Zero sides: stdin `'0\n0'`, stdout `'0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program adds the two integer sides and prints twice that sum.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
