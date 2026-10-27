# Compute Hypotenuse

## Question

Write a program that reads two integers A and B and prints the hypotenuse sqrt(A ** 2 + B ** 2) truncated to an integer.

## Supplied Python code

```python
A = int(input())
B = int(input())
def computeHypotenuse():
    print(int((A ** 2 + B ** 2) ** 0.5))
computeHypotenuse()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Legs 3 and 4 | `'3\n4\n'` | `'5\n'` |
| Legs 6 and 8 | `'6\n8\n'` | `'10\n'` |
| Legs 1 and 1 | `'1\n1\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_compute_hypotenuse.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: The truncated hypotenuse.
- Truncation loses the fractional part; it is not a rounded result.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
