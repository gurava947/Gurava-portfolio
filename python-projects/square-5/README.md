# Square - 5

## Question

Read S and N and print N rows, each repeating the numbers S to S+N-1.

## Supplied Python code

```python
S,N =int(input()),int(input())
for i in range(N):
    row = ""
    for j in range(N):
        row += str(S+j) +" "
    print(row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| S = 3, N = 4 | `'3\n4\n'` | `'3 4 5 6 \n3 4 5 6 \n3 4 5 6 \n3 4 5 6 \n'` |
| S = 1, N = 3 | `'1\n3\n'` | `'1 2 3 \n1 2 3 \n1 2 3 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_square_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers S and N.
- Output: N rows of consecutive numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
