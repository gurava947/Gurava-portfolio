# Numbers in Square - 3

## Question

Read N and print an N x N square counting from 1 to N*N without resetting.

## Supplied Python code

```python
def Number_in_square():
    N = int(input())
    Number = 1
    for i in range(N):
        for j in range(N):
            print(Number,end=" ")
            Number += 1
        print()
Number_in_square()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'1 2 3 \n4 5 6 \n7 8 9 \n'` |
| N = 4 | `'4\n'` | `'1 2 3 4 \n5 6 7 8 \n9 10 11 12 \n13 14 15 16 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_square_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A square of consecutive numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
