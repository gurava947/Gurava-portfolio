# Numbers in Square

## Question

Read N and print an N x N square where every row contains the numbers 1 to N.

## Supplied Python code

```python
def Number_in_Square():
    N = int(input())
    for i in range(N):
        for j in range(N):
            print(j+1,end=" ")
        print()
Number_in_Square()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'1 2 3 \n1 2 3 \n1 2 3 \n'` |
| N = 4 | `'4\n'` | `'1 2 3 4 \n1 2 3 4 \n1 2 3 4 \n1 2 3 4 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_square.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: N identical rows of the numbers 1 to N.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
