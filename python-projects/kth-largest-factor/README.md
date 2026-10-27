# Kth Largest Factor

## Question

Read N and K and print the factors of N.

## Supplied Python code

```python
N , K = int(input()) , int(input())
for i in range(1,N+1):
    if(N % i == 0):
        print(i)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 12, K = 3 | `'12\n3\n'` | `'1\n2\n3\n4\n6\n12\n'` |
| N = 7, K = 2 | `'7\n2\n'` | `'1\n7\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_kth_largest_factor.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers N and K.
- Output: Every factor of N, one per line.
- K is read and never used, so the program prints all factors rather than the K-th largest.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
