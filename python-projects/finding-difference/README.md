# Finding Difference

## Question

Write a program that reads two integers A and B and prints their difference.

## Supplied Python code

```python
A,B = int(input()),int(input())
if (0 < A) and (0 < B):
    if A < B:
        print(B - A)
    else:
        print(A - B)
elif (0 > A) and (0 > B):
    if A < B:
        print(-1 * (A - B))
    else:
        print((-1) * (B - A))
else:
    print(-1 * (-A +(B)))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 and 12 | `'5\n12\n'` | `'7\n'` |
| Negative pair | `'-3\n-8\n'` | `'5\n'` |
| Positive and negative | `'4\n-6\n'` | `'10\n'` |
| Negative and positive | `'-3\n5\n'` | `'-8\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_finding_difference.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: The difference.
- Mixed signs are sign-asymmetric: A = -3 and B = 5 print -8, while A = 4 and B = -6 print 10.
- When A is zero the mixed branch prints -B.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
