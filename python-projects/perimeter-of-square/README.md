# Perimeter of Square

## Question

Read the length of a side and print the perimeter of the square.

## Supplied Python code

```python
def perimeter_of_square(result):
    return side * 4
side = int(input())
result = perimeter_of_square(result = side)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| side five | '5\n' | '20\n' |
| side nine | '9\n' | '36\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_perimeter_of_square.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One integer.
- `perimeter_of_square` returns `side * 4`, reading the module-level `side` rather than its own parameter.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
