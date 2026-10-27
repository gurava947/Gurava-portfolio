# GCD

## Question

Read M and N and print their greatest common divisor.

## Supplied Python code

```python
M,N = int(input()),int(input())
if (M > N):
    Number = M
else:
    Number = N
gcd = 0
for i in range(1,Number +1):
    if(M % i == 0 and N % i == 0):
        gcd = i
print(gcd)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 12, N = 18 | `'12\n18\n'` | `'6\n'` |
| M = 7, N = 5 | `'7\n5\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_gcd.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The greatest common divisor.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
