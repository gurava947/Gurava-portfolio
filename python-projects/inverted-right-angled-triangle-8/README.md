# Inverted Right Angled Triangle - 8

## Question

Read N and print rows of stars that decrease while the left padding grows.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    star = ((N*2) - i-(i-1)) * "* "
    spaces = ((i*2)-2) * ("  ")
    print(spaces + star)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'* * * * * * * \n    * * * * * \n        * * * \n            * \n'` |
| N = 2 | `'2\n'` | `'* * * \n    * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_inverted_right_angled_triangle_8.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A right-aligned shrinking triangle.
- Each row adds two spaces of left padding, so the output is wider than the star count suggests.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
