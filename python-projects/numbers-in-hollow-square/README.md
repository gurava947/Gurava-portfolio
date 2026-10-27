# Numbers in Hollow Square

## Question

Read N and print an N x N square where the border shows the column numbers and the interior is blank.

## Supplied Python code

```python
def Number_in_Hollow_Square():
    N = int(input())
    for i  in range(1,N+1):
        for j in range(1,N+1):
            if (i == 1 or i == N or j == 1 or j == N):
                print(j,end=" ")
            else:
                print("  ",end="")
        print()
Number_in_Hollow_Square()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 2 3 4 \n1     4 \n1     4 \n1 2 3 4 \n'` |
| N = 3 | `'3\n'` | `'1 2 3 \n1   3 \n1 2 3 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_square.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow square of numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
