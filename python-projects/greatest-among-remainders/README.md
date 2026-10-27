# Greatest Among Remainders

## Question

Write a program that reads N, computes N % 4 and N % 5, and prints the greater of the two remainders.

## Supplied Python code

```python
N = int(input())
a1 = int(N % 4)
a2 = int(N % 5)
if (a1 > a2):
    print(a1)
else:
    print(a2)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 9 | `'9\n'` | `'4\n'` |
| N = 6 | `'6\n'` | `'2\n'` |
| N = 20 (tie) | `'20\n'` | `'0\n'` |
| N = 14 | `'14\n'` | `'4\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greatest_among_remainders.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The larger remainder.
- When N % 4 and N % 5 are equal the code prints N % 5.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
