# Square - 4

## Question

Read N and print an N x N square where every value in a row is that row index counting from 0.

## Supplied Python code

```python
N = int(input())
def Square(N):
    for i in range(N):
        print(N * (str(i) + " "))
Square(N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'0 0 0 \n1 1 1 \n2 2 2 \n'` |
| N = 2 | `'2\n'` | `'0 0 \n1 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_square_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: N rows repeating the 0-based row index.
- Rows start at 0, so the last value printed is N-1 rather than N.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
