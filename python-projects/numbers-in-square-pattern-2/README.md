# Numbers in Square Pattern - 2

## Question

Read N and print an N x N square where every row repeats that row number.

## Supplied Python code

```python
A = int(input())
for i in range(A):
    for j in range(A):
        print(i+1,end=" ")
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'1 1 1 \n2 2 2 \n3 3 3 \n'` |
| N = 5 | `'5\n'` | `'1 1 1 1 1 \n2 2 2 2 2 \n3 3 3 3 3 \n4 4 4 4 4 \n5 5 5 5 5 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_square_pattern_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: N rows repeating the row number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
