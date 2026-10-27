# Area and Perimeter of Square

## Question

Read the side of a square and print its area and perimeter with the supplied labels.

## Supplied Python code

```python
side = int(input())
print("Area of the square is:",(side*side))
print("Perimeter of the square is:",(4*side))
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 | `'5'` | `'Area of the square is: 25\nPerimeter of the square is: 20\n'` |
| 3 | `'3'` | `'Area of the square is: 9\nPerimeter of the square is: 12\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_area_and_perimeter_of_square.py" -v
```

Edge cases covered:

- Zero: stdin `'0'`, stdout `'Area of the square is: 0\nPerimeter of the square is: 0\n'`.
- Negative: stdin `'-2'`, stdout `'Area of the square is: 4\nPerimeter of the square is: -8\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program prints the area and then the perimeter, each after the exact supplied label.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
