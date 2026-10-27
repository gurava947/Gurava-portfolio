# Find the Remainder

## Question

Write a program that reads two integers A and B and prints the remainder when A is divided by B.

## Supplied Python code

```python
A = int(input())
B = int(input())
print(A%B)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 17 divided by 5 | `'17\n5\n'` | `'2\n'` |
| 100 divided by 7 | `'100\n7\n'` | `'2\n'` |
| 9 divided by 3 | `'9\n3\n'` | `'0\n'` |
| 45 divided by 8 | `'45\n8\n'` | `'5\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_find_the_remainder.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: The division remainder.
- B must be non-zero; a zero divisor raises ZeroDivisionError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
