# Numbers in Hollow Square - 3

## Question

Read X and N and print an N x N hollow square whose border values start at X and increase.

## Supplied Python code

```python
def Numbers_in_Hollow_spaces():
    X,N = int(input()),int(input())
    K = X
    for i in range(1,N+1):
        for j in range(1,N+1):
            if (i == 1 or i == N or j == 1 or j == N):
                print(K,end=" ")
                K += 1
            else:
                print("  ",end="")
                K += 1
        print()
Numbers_in_Hollow_spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, N = 3 | `'3\n3\n'` | `'3 4 5 \n6   8 \n9 10 11 \n'` |
| X = 10, N = 4 | `'10\n4\n'` | `'10 11 12 13 \n14     17 \n18     21 \n22 23 24 25 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_square_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and N.
- Output: A hollow numbered square.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
