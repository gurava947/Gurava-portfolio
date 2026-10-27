# Quotient & Remainder

## Question

Write a program that reads two integers A and B and prints the integer quotient, then the remainder.

## Supplied Python code

```python
A = int(input())
B = int(input())
print(int(A / B))
print(A % B)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 17 divided by 5 | `'17\n5\n'` | `'3\n2\n'` |
| 100 divided by 8 | `'100\n8\n'` | `'12\n4\n'` |
| 9 divided by 4 | `'9\n4\n'` | `'2\n1\n'` |
| 20 divided by 5 | `'20\n5\n'` | `'4\n0\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_quotient_and_remainder.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: Quotient then remainder, one per line.
- B must be non-zero.
- Negative inputs are not used as fixtures because int(A / B) truncates toward zero rather than flooring.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
