# Name of the polygon

## Question

Write a program that reads a number of sides and prints Triangle, Quadrilateral, Pentagon, Big Polygon above 5, or Not Polygon below 3.

## Supplied Python code

```python
N = int(input())

if N == 3:
    print("Triangle")
elif N == 4:
    print("Quadrilateral")
elif N == 5:
    print("Pentagon")
elif N > 5:
    print("Big Polygon")
else:
    print("Not Polygon")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3 sides | `'3\n'` | `'Triangle\n'` |
| 5 sides | `'5\n'` | `'Pentagon\n'` |
| 6 sides | `'6\n'` | `'Big Polygon\n'` |
| 2 sides | `'2\n'` | `'Not Polygon\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_name_of_the_polygon.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: A polygon name.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
