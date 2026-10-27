# Smallest Remainder

## Question

Write a program that reads two integers A and B and prints the smaller of A % B and B % A.

## Supplied Python code

```python
A = int(input())
B = int(input())
if (A % B) > (B % A):
    print(B%A)
else:
    print(A%B)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 10 and 3 (tie) | `'10\n3\n'` | `'1\n'` |
| 7 and 4 | `'7\n4\n'` | `'3\n'` |
| 9 and 2 | `'9\n2\n'` | `'1\n'` |
| 12 and 5 | `'12\n5\n'` | `'2\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_smallest_remainder.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: The smaller remainder.
- Both inputs must be non-zero.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
