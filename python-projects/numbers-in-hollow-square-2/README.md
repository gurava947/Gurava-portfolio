# Numbers in Hollow Square - 2

## Question

Read N and print an N x N hollow square whose border values count down from N on every row.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    values = N
    for j in range(1,N+1):
        if (i == 1 or i == N or j == 1 or j == N):
            print(str(values) + " ",end = "")
            values -= 1
        else:
            print(" ",end = " ")
            values -= 1
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'4 3 2 1 \n4     1 \n4     1 \n4 3 2 1 \n'` |
| N = 3 | `'3\n'` | `'3 2 1 \n3   1 \n3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_square_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow descending-number square.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
