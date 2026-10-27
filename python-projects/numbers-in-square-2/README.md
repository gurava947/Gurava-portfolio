# Numbers in Square - 2

## Question

Read N and print an N x N square where every row contains the numbers N down to 1.

## Supplied Python code

```python
def Number_in_square():
    N = int(input())
    for i in range(N):
        row = ""
        for j in range(N):
            # row = (" " +str(N-j)) + row
            row = row + (str(N-j) + " ")
        # print(row[::-1])
        print(row)
Number_in_square()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'4 3 2 1 \n4 3 2 1 \n4 3 2 1 \n4 3 2 1 \n'` |
| N = 3 | `'3\n'` | `'3 2 1 \n3 2 1 \n3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_square_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: N identical rows counting down.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
