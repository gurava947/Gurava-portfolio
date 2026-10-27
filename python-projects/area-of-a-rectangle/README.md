# Area of a Rectangle

## Question

Read the length and breadth of a rectangle and print its area.

## Supplied Python code

```python
a = int(input())
b = int(input())
print(a*b)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4 by 5 | `'4\n5'` | `'20\n'` |
| 3 by 7 | `'3\n7'` | `'21\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_area_of_a_rectangle.py" -v
```

Edge cases covered:

- Negative side: stdin `'-2\n5'`, stdout `'-10\n'`.
- Zero side: stdin `'0\n5'`, stdout `'0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program multiplies the two integer inputs and prints the product.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
