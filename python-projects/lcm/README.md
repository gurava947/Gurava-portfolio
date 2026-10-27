# LCM

## Question

Read M and N and print their least common multiple.

## Supplied Python code

```python
M,N=int(input()),int(input())

if (M > N):
    greatest_num = M
else:
    greatest_num = N
for i in range(greatest_num,(M * (N+1))):
    if (i % M == 0 and i % N == 0):
        print(i)
        break
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 12, N = 18 | `'12\n18\n'` | `'36\n'` |
| M = 4, N = 6 | `'4\n6\n'` | `'12\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_lcm.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The least common multiple.
- The search stops at M*(N+1), so very large pairs take many iterations.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
