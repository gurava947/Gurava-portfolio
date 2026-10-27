# Numbers in Hollow Rectangle - 3

## Question

Read M and N and print a hollow rectangle whose border cells count down from M*N.

## Supplied Python code

```python
def Numbers_in_Hollow_spaces():
    M,N = int(input()),int(input())
    K = (M*N)
    for i in range(1,M+1):
        for j in range(1,N+1):
            if (i == 1 or i == M or j == 1 or j == N):
                row = ""
                row += str(K) + " "
                print(row,end="")
                K -= 1
            else:
                row = ""
                row += "  "
                print(row,end="")
                K -= 1
        print()
Numbers_in_Hollow_spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 3, N = 3 | `'3\n3\n'` | `'9 8 7 \n6   4 \n3 2 1 \n'` |
| M = 4, N = 3 | `'4\n3\n'` | `'12 11 10 \n9   7 \n6   4 \n3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_rectangle_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: A hollow descending rectangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
