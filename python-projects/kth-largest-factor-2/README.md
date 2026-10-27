# Kth Largest Factor - 2

## Question

Read N and K and print the K-th largest factor of N.

## Supplied Python code

```python
N,K = int(input()),int(input())
for i in range(N):
    if (N % (N - i) == 0):
        large_fact = (N - i)
        K = (K-1)
    if (K == 0):
        break
print(large_fact)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 12, K = 3 | `'12\n3\n'` | `'4\n'` |
| N = 12, K = 1 | `'12\n1\n'` | `'12\n'` |
| N = 7, K = 5 | `'7\n5\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_kth_largest_factor_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers N and K.
- Output: The K-th largest factor.
- When K exceeds the number of factors the loop ends at the smallest factor instead of reporting an error.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
