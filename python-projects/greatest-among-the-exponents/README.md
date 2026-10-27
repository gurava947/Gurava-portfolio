# Greatest Among The Exponents

## Question

Write a program that reads two integers A and B and prints the greater of A ** B and B ** A.

## Supplied Python code

```python
A = int(input())
B = int(input())
if (A ** B > B ** A):
    print(A ** B)
else:
    print(B ** A)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2^3 versus 3^2 | `'2\n3\n'` | `'9\n'` |
| 3^2 versus 2^3 | `'3\n2\n'` | `'9\n'` |
| 2^5 versus 5^2 | `'2\n5\n'` | `'32\n'` |
| 4^2 versus 2^4 (tie) | `'4\n2\n'` | `'16\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greatest_among_the_exponents.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: The larger power.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
